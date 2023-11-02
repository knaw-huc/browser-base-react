import React from 'react';
import { FacetEvent, RegisterFacet, UnregisterFacet } from '../hooks/useSearch.js';
interface FreeTextProps {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    name?: string;
    field?: string;
}
export default function FreeTextFacet({ registerFacet, unregisterFacet, setFacet, name, field }: FreeTextProps): React.JSX.Element;
export {};
