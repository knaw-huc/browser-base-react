import React, {FunctionComponent, ReactElement} from 'react';
import {useNavigate, LoaderFunctionArgs, useLoaderData, useNavigation} from 'react-router-dom';
import {
    ISendCandidate,
    IFacetCandidate,
    ISearchObject,
    ISearchValues,
    IResultList,
} from '../misc/interfaces';

export interface SearchProps<R> {
    title: string;
    noIndexPage?: boolean;
    withPaging?: boolean;
    resultItemComponent: FunctionComponent<{ item: R }>;
    facetsComponent: FunctionComponent<{ sendCandidateHandler: ISendCandidate }>;
    headersElement?: ReactElement;
}

export function createSearchLoader(searchUrl: string, pageLength?: number, sortOrder?: string) {
    return async ({params}: LoaderFunctionArgs) => {
        let searchStruc: ISearchObject = {
            searchvalues: [],
            page: 1,
            page_length: pageLength || 500,
            sortorder: sortOrder || 'title'
        };

        if (params.code) {
            const parameters: ISearchObject = JSON.parse(window.atob(params.code));
            searchStruc = {
                searchvalues: parameters.searchvalues,
                page: parameters.page,
                page_length: pageLength || 500,
                sortorder: sortOrder || 'title'
            };
        }

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

    function doSearch(searchStruc: ISearchObject) {
        navigate((props.noIndexPage ? '/' : '/search/') + window.btoa(JSON.stringify(searchStruc)));
        window.scroll(0, 0);
    }

    function removeFacet(field: string, value: string) {
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

        doSearch({...searchStruc, page: 1});
    }

    function resetFacets() {
        doSearch({...searchStruc, searchvalues: [], page: 1});
    }

    function nextPage() {
        doSearch({...searchStruc, page: searchStruc.page + 1});
    }

    function selectPage(page: number) {
        doSearch({...searchStruc, page});
    }

    function prevPage() {
        if (searchStruc.page > 0) {
            doSearch({...searchStruc, page: searchStruc.page - 1});
        }
    }

    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        if (searchStruc.searchvalues.length === 0) {
            searchStruc.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
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

        doSearch({...searchStruc, page: 1});
    }

    return (
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin hcMarginBottom1">
                <h1>Search</h1>
            </div>

            <div className="hcLayoutFacet-Result hcBasicSideMargin">
                <div className="hcLayoutFacets">
                    <div className="hcLayoutFacetsToggel">
                        <props.facetsComponent sendCandidateHandler={sendCandidate}/>
                    </div>
                </div>

                <div className="hcLayoutResults">
                    <div className="hcResultsHeader hcMarginBottom1">
                        {props.withPaging
                            ? result.amount > 9999
                                ? <div>{result.amount}+ results, page {searchStruc.page} of {result.pages} pages</div>
                                : <div>{result.amount} results, page {searchStruc.page} of {result.pages} pages</div>
                            : <div>{result.amount} items found</div>}
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

                    {props.headersElement}

                    {navigation.state === 'loading'
                        ? <div className="hcResultListLoading">Loading...</div>
                        : <>
                            <div>
                                {result.items.map((item: R, index: number) =>
                                    <props.resultItemComponent item={item} key={index}/>
                                )}
                            </div>
                            {props.withPaging && result.amount > searchStruc.page_length && (
                                <div className="hcPagination">
                                    {searchStruc.page < 2
                                        ? <div/>
                                        : <div className="hcClickable" onClick={prevPage}>&#8592; Previous</div>}

                                    <div className="hcClickable">
                                        <select className="hcPageSelector" value={searchStruc.page}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                    selectPage(Number(e.target.value))}>
                                            {Array.from({length: result.pages}, (x, i) =>
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            )}
                                        </select>
                                    </div>

                                    {searchStruc.page < result.pages
                                        ? <div className="hcClickable" onClick={nextPage}>Next &#8594;</div>
                                        : <div/>}
                                </div>)}
                        </>}
                </div>
            </div>
        </div>
    )
}
