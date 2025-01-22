import React, {FunctionComponent, ReactElement} from 'react';
import {useNavigate, useLoaderData, useNavigation} from 'react-router-dom';
import useSearch, {
    FacetEvent,
    RegisterFacet,
    UnregisterFacet,
    LabeledSearchValues,
    SearchObject
} from '../hooks/useSearch.js';
import {SearchContextProvider, SearchValues} from '../context/SearchContext';
import {getPages} from '../misc/paging.js';
import {createCodeFromSearchObject, createParamsFromSearchObject} from '../misc/search.js';

interface ResultList<R> {
    amount: number;
    pages: number;
    items: R[];
}

export interface FacetsParams {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    searchValues: SearchValues[];
}

export enum SearchParams { CODE, PARAMS}

export interface SearchProps<R> {
    title?: string;
    pageLength: number;
    hasIndexPage?: boolean;
    withPaging?: boolean;
    updateDocumentTitle?: boolean;
    showSearchHeader?: boolean;
    searchParams?: SearchParams;
    ResultItemComponent: FunctionComponent<{ item: R }>;
    facetsElement: ReactElement;
    headersElement?: ReactElement;
}

export default function Search<R>({
                                      title,
                                      pageLength,
                                      hasIndexPage = true,
                                      withPaging = true,
                                      updateDocumentTitle = true,
                                      showSearchHeader = true,
                                      searchParams = SearchParams.CODE,
                                      ResultItemComponent,
                                      facetsElement,
                                      headersElement
                                  }: SearchProps<R>) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const [{searchvalues, page}, {amount, pages, items}] = useLoaderData() as [SearchObject, ResultList<R>];

    if (updateDocumentTitle) {
        document.title = title ? `Search | ${title}` : 'Search';
    }

    function doSearch(searchValues: SearchValues[], page: number) {
        const searchObject = {searchvalues: searchValues, page: page};

        switch (searchParams) {
            case SearchParams.PARAMS:
                const params = createParamsFromSearchObject(searchObject);
                navigate((hasIndexPage ? '/search?' : '?') + params.toString());
                break;
            case SearchParams.CODE:
            default:
                const code = createCodeFromSearchObject(searchObject);
                navigate((hasIndexPage ? '/search/' : '/') + code);
        }

        window.scroll(0, 0);
    }

    return (
        <SearchContextProvider searchValues={searchvalues} page={page} onSearch={doSearch}>
            <div className="hcContentContainer">
                {showSearchHeader && <div className="hcBasicSideMargin hcMarginBottom1">
                    <h1>Search</h1>
                </div>}

                <div className="hcLayoutFacet-Result hcBasicSideMargin">
                    <div className="hcLayoutFacets">
                        <div className="hcLayoutFacetsToggel">
                            {facetsElement}
                        </div>
                    </div>

                    <div className="hcLayoutResults">
                        <AmountAndPages withPaging={!!withPaging} amount={amount} page={page} pages={pages}/>

                        <SelectedFacets/>

                        {headersElement}

                        {navigation.state === 'loading'
                            ? <div className="hcResultListLoading">Loading...</div>
                            : <>
                                <div>
                                    {items.map((item: R, index: number) =>
                                        <ResultItemComponent item={item} key={index}/>
                                    )}
                                </div>

                                {withPaging && amount > pageLength && <Paging page={page} pages={pages}/>}
                            </>}
                    </div>
                </div>
            </div>
        </SearchContextProvider>
    );
}

interface AmountAndPagesParams {
    withPaging: boolean;
    amount: number;
    page: number;
    pages: number;
}

function AmountAndPages({withPaging, amount, page, pages}: AmountAndPagesParams) {
    return (
        <div className="hcResultsHeader hcMarginBottom1">
            {withPaging
                ? amount > 9999
                    ? <div>{amount}+ results, page {page} of {pages} pages</div>
                    : <div>{amount} results, page {page} of {pages} pages</div>
                : <div>{amount} items found</div>}
        </div>
    );
}

function SelectedFacets() {
    const {labeledSearchValues, resetFacets, removeFacet} = useSearch();

    return (
        <div className="hcMarginBottom2">
            <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets:
                <span className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
            </div>

            {labeledSearchValues.length === 0 ? (
                <span className="hcSelectedFacet">
                    <span className="hcSelectedFacetType">None</span>
                </span>
            ) : (
                labeledSearchValues.map((item: LabeledSearchValues) => (
                    <span className="hcSelectedFacet" key={item.field}>
                        <span className="hcSelectedFacetType">{item.label}: </span>
                        {item.values.map((value, i) => (
                            <div className="hcFacetValues" key={i}
                                 onClick={_ => removeFacet(item.field, value)}>
                                {value} [x]
                            </div>
                        ))}
                    </span>
                )))}
        </div>
    );
}

interface PagingParams {
    page: number;
    pages: number;
}

function Paging({page, pages}: PagingParams) {
    const {selectPage, prevPage, nextPage} = useSearch();

    return (
        <div className="hcPagination">
            {page > 1 && <div className="hcClickable" onClick={prevPage}>&#8592; Previous</div>}

            <div className="hcClickable">
                <select className="hcPageSelector" value={page}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectPage(Number(e.target.value))}>
                    {getPages(pages).map(p =>
                        <option key={p} value={p}>{p}</option>)}
                </select>
            </div>

            {page < pages && <div className="hcClickable" onClick={nextPage}>Next &#8594;</div>}
        </div>
    );
}
