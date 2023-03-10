/// <reference types="react" />
import { FunctionComponent, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';

interface IMetadata {
    title: string;
    description: string;
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
    resultItemComponent: FunctionComponent<{
        item: R;
    }>;
    facetsComponent: FunctionComponent<{
        sendCandidateHandler: ISendCandidate;
    }>;
}

interface DetailProps<D> {
    title: string;
    detailComponent: FunctionComponent<{
        data: D;
    }>;
}

declare function FreeTextFacet(props: {
    add: ISendCandidate;
}): JSX.Element;

declare function ListFacet(props: {
    parentCallback: ISendCandidate;
    name: string;
    field: string;
    url: string;
}): JSX.Element;

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
declare function BrowserBase<D, R>(props: BrowserBaseProps<D, R>): JSX.Element;

export { BrowserBase, BrowserBaseProps, FreeTextFacet, ISendCandidate, ListFacet };
