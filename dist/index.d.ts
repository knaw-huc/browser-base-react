import React, { ReactElement, FunctionComponent } from 'react';
import { RouteObject } from 'react-router-dom';

type Search$1 = [
    LabeledSearchValues[],
    RegisterFacet,
    UnregisterFacet,
    (page: number) => void,
    () => void,
    () => void,
    () => void,
    FacetEvent,
    FacetEvent
];
type RegisterFacet = (field: string, label: string) => void;
type UnregisterFacet = (field: string) => void;
interface SearchValues {
    field: string;
    values: string[];
}
interface LabeledSearchValues extends SearchValues {
    label: string;
}
type FacetEvent = (field: string, value: string) => void;
interface SearchObject {
    searchvalues: SearchValues[];
    page: number;
    page_length?: number;
    sortorder?: string;
}
declare function useSearch(searchValues: SearchValues[], page: number, onSearch: (searchValues: SearchValues[], page: number) => void): Search$1;

type FreeTextFacet$1 = [
    string,
    () => void,
    (e: React.FormEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void
];
declare function useFreeTextFacet(registerFacet: RegisterFacet, unregisterFacet: UnregisterFacet, setFacet: FacetEvent, label?: string, field?: string): FreeTextFacet$1;

interface FacetValue {
    key: string;
    doc_count: number;
}
type ListFacet$1 = [
    FacetValue[],
    boolean,
    boolean,
    (hidden: boolean) => void,
    boolean,
    () => void,
    (value: string) => void,
    (e: React.FormEvent<HTMLInputElement>) => void
];
declare function useListFacet(label: string, field: string, url: string, registerFacet: RegisterFacet, unregisterFacet: UnregisterFacet, setFacet: FacetEvent, searchValues?: SearchValues[], usePost?: boolean, startAmount?: number, moreAmount?: number): ListFacet$1;

declare function createSearchLoader<I>(searchCodeLoader: (i: I) => SearchObject, searchUrl: string, initialPageLength?: number, initialSortOrder?: string): (i?: I) => Promise<any[]>;

declare function createDetailLoader(getFetchUrl: (id: string) => string): (id: string) => Promise<Response>;

declare function App({ header, footer }: {
    header: ReactElement;
    footer?: ReactElement;
}): React.JSX.Element;

interface HomeProps {
    title: string;
    description?: string;
    updateDocumentTitle?: boolean;
}
declare function Home({ title, description, updateDocumentTitle }: HomeProps): React.JSX.Element;

declare function PageHeader({ title }: {
    title: string;
}): React.JSX.Element;

interface FacetsParams {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    searchValues: SearchValues[];
}
declare enum SearchParams {
    CODE = 0,
    PARAMS = 1
}
interface SearchProps<R> {
    title?: string;
    pageLength: number;
    hasIndexPage?: boolean;
    withPaging?: boolean;
    updateDocumentTitle?: boolean;
    showSearchHeader?: boolean;
    searchParams?: SearchParams;
    ResultItemComponent: FunctionComponent<{
        item: R;
    }>;
    FacetsComponent: FunctionComponent<FacetsParams>;
    headersElement?: ReactElement;
}
declare function Search<R>({ title, pageLength, hasIndexPage, withPaging, updateDocumentTitle, showSearchHeader, searchParams, ResultItemComponent, FacetsComponent, headersElement }: SearchProps<R>): React.JSX.Element;

interface DetailProps<D> {
    title?: string;
    updateDocumentTitle?: boolean;
    DetailComponent: FunctionComponent<{
        data: D;
    }>;
}
declare function Detail<D>({ title, updateDocumentTitle, DetailComponent }: DetailProps<D>): React.JSX.Element;

interface FreeTextProps {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    name?: string;
    field?: string;
}
declare function FreeTextFacet({ registerFacet, unregisterFacet, setFacet, name, field }: FreeTextProps): React.JSX.Element;

interface ListFacetParams {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    name: string;
    field: string;
    url: string;
    searchValues: SearchValues[];
    usePost?: boolean;
    flex?: boolean;
}
declare function ListFacet({ registerFacet, unregisterFacet, setFacet, name, field, url, searchValues, usePost, flex }: ListFacetParams): React.JSX.Element;

interface RouterProps<D, R> extends HomeProps, DetailProps<D>, SearchProps<R> {
    title: string;
    AppComponent?: FunctionComponent<{
        children: ReactElement | ReactElement[];
    }>;
    headerElement?: ReactElement;
    footerElement?: ReactElement;
    rootElement?: ReactElement;
    childRoutes?: RouteObject[];
    searchUrl: string;
    sortOrder?: string;
    getFetchUrl: (id: string) => string;
}
declare function Router<D, R>(props: RouterProps<D, R>): React.JSX.Element;

declare function encode(data: string): string;
declare function decode(data: string): string;

declare const base64_d_decode: typeof decode;
declare const base64_d_encode: typeof encode;
declare namespace base64_d {
  export { base64_d_decode as decode, base64_d_encode as encode };
}

declare function getPages(noPages: number, startPage?: number): number[];
declare function getPrevPages(curPage: number, maxPages?: number): number[];
declare function getNextPages(curPage: number, totalPages: number, maxPages?: number): number[];

declare const paging_d_getNextPages: typeof getNextPages;
declare const paging_d_getPages: typeof getPages;
declare const paging_d_getPrevPages: typeof getPrevPages;
declare namespace paging_d {
  export { paging_d_getNextPages as getNextPages, paging_d_getPages as getPages, paging_d_getPrevPages as getPrevPages };
}

declare function createCodeFromSearchObject(searchObject: SearchObject): string;
declare function getSearchObjectFromCode(code?: string): SearchObject;
declare function createParamsFromSearchObject(searchObject: SearchObject): URLSearchParams;
declare function getSearchObjectFromParams(params: URLSearchParams): SearchObject;

declare const search_d_createCodeFromSearchObject: typeof createCodeFromSearchObject;
declare const search_d_createParamsFromSearchObject: typeof createParamsFromSearchObject;
declare const search_d_getSearchObjectFromCode: typeof getSearchObjectFromCode;
declare const search_d_getSearchObjectFromParams: typeof getSearchObjectFromParams;
declare namespace search_d {
  export { search_d_createCodeFromSearchObject as createCodeFromSearchObject, search_d_createParamsFromSearchObject as createParamsFromSearchObject, search_d_getSearchObjectFromCode as getSearchObjectFromCode, search_d_getSearchObjectFromParams as getSearchObjectFromParams };
}

export { App, Detail, type FacetEvent, type FacetsParams, FreeTextFacet, Home, type LabeledSearchValues, ListFacet, PageHeader, type RegisterFacet, Router, Search, type SearchObject, SearchParams, type SearchValues, type UnregisterFacet, base64_d as base64, createDetailLoader, createSearchLoader, paging_d as pagingUtils, search_d as searchUtils, useFreeTextFacet, useListFacet, useSearch };
