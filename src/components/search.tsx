import React, {FunctionComponent, ReactElement} from 'react';
import {useNavigate, useLoaderData, useNavigation} from 'react-router-dom';
import useSearch, {
    FacetEvent,
    RegisterFacet,
    UnregisterFacet,
    LabeledSearchValues,
    SearchValues,
    SearchObject
} from '../hooks/useSearch.js';
import {getPages} from '../misc/paging.js';
import {createCodeFromSearchObject, createParamsFromSearchObject} from '../misc/search.js';
import {useTranslation} from "react-i18next";

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
    FacetsComponent: FunctionComponent<FacetsParams>;
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
                                      FacetsComponent,
                                      headersElement
                                  }: SearchProps<R>) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const [{searchvalues, page}, {amount, pages, items}]
        = useLoaderData() as [SearchObject, ResultList<R>];
    const [
        labeledSearchValues,
        registerFacet,
        unregisterFacet,
        selectPage,
        prevPage,
        nextPage,
        resetFacets,
        removeFacet,
        setFacet
    ] = useSearch(searchvalues, page, doSearch);

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
        <div className="hcContentContainer">
            {showSearchHeader && <div className="hcBasicSideMargin hcMarginBottom1">
                <h1>Search</h1>
            </div>}

            <div className="hcLayoutFacet-Result hcBasicSideMargin">
                <div className="hcLayoutFacets">
                    <div className="hcLayoutFacetsToggel">
                        <FacetsComponent registerFacet={registerFacet} unregisterFacet={unregisterFacet}
                                         setFacet={setFacet} searchValues={searchvalues}/>
                    </div>
                </div>

                <div className="hcLayoutResults">
                    <AmountAndPages withPaging={!!withPaging} amount={amount} page={page} pages={pages}/>

                    <SelectedFacets labeledSearchValues={labeledSearchValues}
                                    resetFacets={resetFacets} removeFacet={removeFacet}/>

                    {headersElement}

                    {navigation.state === 'loading'
                        ? <div className="hcResultListLoading">Loading...</div>
                        : <>
                            <div>
                                {items.map((item: R, index: number) =>
                                    <ResultItemComponent item={item} key={index}/>
                                )}
                            </div>

                            {withPaging && amount > pageLength &&
                                <Paging page={page} pages={pages}
                                        prevPage={prevPage} nextPage={nextPage} selectPage={selectPage}/>}
                        </>}
                </div>
            </div>
        </div>
    )
}

interface AmountAndPagesParams {
    withPaging: boolean;
    amount: number;
    page: number;
    pages: number;
}

function AmountAndPages({withPaging, amount, page, pages}: AmountAndPagesParams) {
    const {t} = useTranslation();

    return (
        <div className="hcResultsHeader hcMarginBottom1">
            {withPaging
                ? amount > 9999
                    // ? <div>{amount}+ results, page {page} of {pages} pages</div>
                    ? <div>{t('browser-base:resultsPaged', {amount: '10000+', page: page, pages: pages})}</div>
                    : <div>{t('browser-base:resultsPaged', {amount: amount, page: page, pages: pages})}</div>
                : <div>{t('browser-base:results', {amount: amount})}</div>}
        </div>
    );
}

interface SelectedFacetsParams {
    labeledSearchValues: LabeledSearchValues[];
    resetFacets: () => void;
    removeFacet: (name: string, value: string) => void;
}

function SelectedFacets({labeledSearchValues, resetFacets, removeFacet}: SelectedFacetsParams) {
    const {t} = useTranslation();

    return (
        <div className="hcMarginBottom2">
            <div className="hcSmallTxt hcTxtColorGreyMid">{t('browser-base:selectedFacets')}
                <span className="hcFacetReset hcClickable" onClick={resetFacets}>{t('browser-base:resetFacets')}</span>
            </div>

            {labeledSearchValues.length === 0 ? (
                <span className="hcSelectedFacet">
                    <span className="hcSelectedFacetType">{t('browser-base:none')}</span>
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
    prevPage: () => void;
    nextPage: () => void;
    selectPage: (page: number) => void;
}

function Paging({page, pages, prevPage, nextPage, selectPage}: PagingParams) {
    const {t} = useTranslation();

    return (
        <div className="hcPagination">
            {page > 1 && <div className="hcClickable" onClick={prevPage}>&#8592; {t('browser-base:previous')}</div>}

            <div className="hcClickable">
                <select className="hcPageSelector" value={page}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectPage(Number(e.target.value))}>
                    {getPages(pages).map(p =>
                        <option key={p} value={p}>{p}</option>)}
                </select>
            </div>

            {page < pages && <div className="hcClickable" onClick={nextPage}>{t('browser-base:next')} &#8594;</div>}
        </div>
    );
}
