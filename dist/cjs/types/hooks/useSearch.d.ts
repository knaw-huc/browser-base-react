type Search = [
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
export type RegisterFacet = (field: string, label: string) => void;
export type UnregisterFacet = (field: string) => void;
export interface SearchValues {
    field: string;
    values: string[];
}
export interface LabeledSearchValues extends SearchValues {
    label: string;
}
export type FacetEvent = (field: string, value: string) => void;
export interface SearchObject {
    searchvalues: SearchValues[];
    page: number;
    page_length?: number;
    sortorder?: string;
}
export default function useSearch(searchValues: SearchValues[], page: number, onSearch: (searchValues: SearchValues[], page: number) => void): Search;
export {};
