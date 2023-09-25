import React, { FunctionComponent, ReactElement } from 'react';
import { LoaderFunctionArgs, RouteObject } from 'react-router-dom';

interface IMetadata {
    title: string;
    description?: string;
}
interface ISearchValues {
    name: string;
    field: string;
    values: string[];
}
interface ISearchObject {
    searchvalues: ISearchValues[];
    page: number;
    page_length: number;
    sortorder: string;
}
interface ISendCandidate {
    (data: IFacetCandidate): void;
}
interface IFacetCandidate {
    facet: string;
    field: string;
    candidate: string;
}
interface IFacetCandidate {
    facet: string;
    field: string;
    candidate: string;
}

interface SearchProps<R> {
    title: string;
    noIndexPage?: boolean;
    withPaging?: boolean;
    resultItemComponent: FunctionComponent<{
        item: R;
    }>;
    facetsComponent: FunctionComponent<{
        sendCandidateHandler: ISendCandidate;
    }>;
    headersElement?: ReactElement;
}
declare function createSearchLoader(searchUrl: string, pageLength?: number, sortOrder?: string): ({ params }: LoaderFunctionArgs) => Promise<{
    searchStruc: ISearchObject;
    result: any;
}>;
declare function Search<R>(props: SearchProps<R>): React.JSX.Element;

interface DetailProps<D> {
    title: string;
    detailComponent: FunctionComponent<{
        data: D;
    }>;
}
declare const createDetailLoader: (getFetchUrl: (id: string) => string) => ({ params }: LoaderFunctionArgs) => Promise<Response>;
declare function Detail<D>(props: DetailProps<D>): React.JSX.Element;

declare function FreeTextFacet(props: {
    add: ISendCandidate;
}): React.JSX.Element;

declare function ListFacet(props: {
    parentCallback: ISendCandidate;
    name: string;
    field: string;
    url: string;
}): React.JSX.Element;

interface BrowserBaseProps<D, R> extends IMetadata, DetailProps<D>, SearchProps<R> {
    headerElement?: ReactElement;
    footerElement?: ReactElement;
    rootElement?: ReactElement;
    childRoutes?: RouteObject[];
    searchUrl: string;
    pageLength?: number;
    sortOrder?: string;
    getFetchUrl: (id: string) => string;
}
declare function BrowserBase<D, R>(props: BrowserBaseProps<D, R>): React.JSX.Element;

export { BrowserBase, BrowserBaseProps, Detail, DetailProps, FreeTextFacet, ISendCandidate, ListFacet, Search, SearchProps, createDetailLoader, createSearchLoader };
