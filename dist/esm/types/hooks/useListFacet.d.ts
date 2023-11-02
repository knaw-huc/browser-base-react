import React from 'react';
import { FacetEvent, RegisterFacet, UnregisterFacet, SearchValues } from './useSearch.js';
interface FacetValue {
    key: string;
    doc_count: number;
}
type ListFacet = [
    FacetValue[],
    boolean,
    boolean,
    (hidden: boolean) => void,
    boolean,
    () => void,
    (value: string) => void,
    (e: React.FormEvent<HTMLInputElement>) => void
];
export default function useListFacet(label: string, field: string, url: string, registerFacet: RegisterFacet, unregisterFacet: UnregisterFacet, setFacet: FacetEvent, searchValues?: SearchValues[], usePost?: boolean, startAmount?: number, moreAmount?: number): ListFacet;
export {};
