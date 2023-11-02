import React from 'react';
import { FacetEvent, RegisterFacet, SearchValues, UnregisterFacet } from '../hooks/useSearch.js';
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
export default function ListFacet({ registerFacet, unregisterFacet, setFacet, name, field, url, searchValues, usePost, flex }: ListFacetParams): React.JSX.Element;
export {};
