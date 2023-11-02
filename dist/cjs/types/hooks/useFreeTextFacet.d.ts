import React from 'react';
import { FacetEvent, RegisterFacet, UnregisterFacet } from './useSearch.js';
type FreeTextFacet = [
    string,
    () => void,
    (e: React.FormEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void
];
export default function useFreeTextFacet(registerFacet: RegisterFacet, unregisterFacet: UnregisterFacet, setFacet: FacetEvent, label?: string, field?: string): FreeTextFacet;
export {};
