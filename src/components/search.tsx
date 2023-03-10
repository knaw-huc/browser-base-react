import React, {FunctionComponent} from 'react';
import {useNavigate, LoaderFunctionArgs, useLoaderData, useNavigation} from 'react-router-dom';
import {
    ISendCandidate,
    IFacetCandidate,
    ISearchObject,
    ISearchValues,
    IResetFacets,
    IResultList,
    IRemoveFacet,
} from '../misc/interfaces';

export interface SearchProps<R> {
    title: string;
    resultItemComponent: FunctionComponent<{ item: R }>;
    facetsComponent: FunctionComponent<{ sendCandidateHandler: ISendCandidate }>;
}

export function createSearchLoader(searchUrl: string, pageLength?: number, sortOrder?: string) {
    return async ({params}: LoaderFunctionArgs) => {
        const parameters: ISearchObject = JSON.parse(window.atob(params.code as string));
        const searchStruc: ISearchObject = {
            searchvalues: parameters.searchvalues,
            page: parameters.page,
            page_length: pageLength || 500,
            sortorder: sortOrder || 'title'
        };

        const result = await fetch(searchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchStruc)
        });

        return {searchStruc, result: await result.json()};
    }
}

export default function Search<R>(props: SearchProps<R>) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const {searchStruc, result} = useLoaderData() as { searchStruc: ISearchObject, result: IResultList<R> };

    const cross = '[x]';
    document.title = `Search | ${props.title}`;

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        if (typeof searchStruc.searchvalues === 'object') {
            searchStruc.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter(element => element !== value);
                }
            })
            searchStruc.searchvalues = searchStruc.searchvalues.filter(el => el.values.length > 0);
            if (searchStruc.searchvalues.length === 0) {
                searchStruc.searchvalues = [];
            }
        }
        navigate('/search/' + window.btoa(JSON.stringify(searchStruc)));
        window.scroll(0, 0);
    }

    const resetFacets: IResetFacets = () => {
        searchStruc.searchvalues = [];
        navigate('/search/' + window.btoa(JSON.stringify(searchStruc)));
    }

    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        if (searchStruc.searchvalues.length === 0) {
            searchStruc.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            searchStruc.page = 1;
        }
        else {
            if (typeof searchStruc.searchvalues === 'object') {
                let found: boolean = false;
                searchStruc.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            item.values.push(candidate.candidate);
                        }
                    }
                });
                if (!found) {
                    searchStruc.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
        }
        navigate('/search/' + window.btoa(JSON.stringify(searchStruc)));
        window.scroll(0, 0);
    }

    return (
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                <h1>Search</h1>
            </div>
            <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                <div className="hcLayoutFacets">
                    <props.facetsComponent sendCandidateHandler={sendCandidate}/>
                </div>
                <div className="hcLayoutResults">
                    <div className="hcResultsHeader hcMarginBottom1">
                        <div>{result.amount} items found</div>
                    </div>
                    <div className="hcMarginBottom2">
                        <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets:
                            <span className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
                        </div>
                        {searchStruc.searchvalues.length === 0 ? (<span className="hcSelectedFacet">
                            <span className="hcSelectedFacetType">None</span>
                        </span>) : (searchStruc.searchvalues.map((item: ISearchValues) => (
                            <span className="hcSelectedFacet">
                                <span className="hcSelectedFacetType">{item.name}: </span>
                                {item.values.map((skipper, i) => (
                                    <div className="hcFacetValues" key={i}
                                         onClick={() => removeFacet(item.name, skipper)}>
                                        {skipper} {cross}
                                    </div>
                                ))}
                            </span>
                        )))}
                    </div>
                    {navigation.state === 'loading'
                        ? <div className="hcResultListLoading">Loading...</div>
                        : result.items.map((item: R, index: number) =>
                            <props.resultItemComponent item={item} key={index}/>
                        )}
                </div>
            </div>
        </div>
    )
}
