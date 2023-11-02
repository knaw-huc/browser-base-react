import React, { FunctionComponent, ReactElement } from 'react';
import { FacetEvent, RegisterFacet, UnregisterFacet, SearchValues } from '../hooks/useSearch.js';
export interface FacetsParams {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    searchValues: SearchValues[];
}
export declare enum SearchParams {
    CODE = 0,
    PARAMS = 1
}
export interface SearchProps<R> {
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
export default function Search<R>({ title, pageLength, hasIndexPage, withPaging, updateDocumentTitle, showSearchHeader, searchParams, ResultItemComponent, FacetsComponent, headersElement }: SearchProps<R>): React.JSX.Element;
