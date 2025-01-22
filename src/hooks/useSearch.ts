import {useContext} from 'react';
import {Facets, SearchContext, SearchValues} from '../context/SearchContext';

interface Search {
    searchValues: SearchValues[];
    labeledSearchValues: LabeledSearchValues[];
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    selectPage: (page: number) => void;
    prevPage: () => void;
    nextPage: () => void;
    resetFacets: () => void;
    removeFacet: FacetEvent;
    setFacet: FacetEvent;
}

export type RegisterFacet = (field: string, label: string) => void;
export type UnregisterFacet = (field: string) => void;

export interface LabeledSearchValues extends SearchValues {
    label: string;
}

export type FacetEvent = (field: string, value: string, replace?: boolean) => void;

export interface SearchObject {
    searchvalues: SearchValues[];
    page: number;
    page_length?: number;
    sortorder?: string;
}

export default function useSearch(): Search {
    const {facets, setFacets, searchValues, page, onSearch} = useContext(SearchContext)!;

    const labeledSearchValues = searchValues.reduce<LabeledSearchValues[]>((acc, values) => {
        if (values.field in facets) {
            acc.push({...values, label: facets[values.field]});
        }
        return acc;
    }, []);

    function registerFacet(field: string, label: string) {
        setFacets(facets => ({
            [field]: label,
            ...facets
        }));
    }

    function unregisterFacet(field: string) {
        setFacets(facets => Object.keys(facets).reduce<Facets>((acc, f) => {
            if (f !== field) {
                acc[f] = facets[f];
            }
            return acc;
        }, {}));
    }

    function selectPage(page: number) {
        onSearch(searchValues, page);
    }

    function prevPage() {
        if (page > 1) {
            selectPage(page - 1);
        }
    }

    function nextPage() {
        selectPage(page + 1);
    }

    function resetFacets() {
        onSearch([], 1);
    }

    function removeFacet(field: string, value: string) {
        const newSearchValues = searchValues.reduce<SearchValues[]>((acc, item) => {
            let values = item.values;
            if (item.field === field) {
                values = values.filter(element => element !== value);
            }
            if (values.length > 0) {
                acc.push({field: item.field, values});
            }
            return acc;
        }, []);

        onSearch(newSearchValues, 1);
    }

    function setFacet(field: string, value: string, replace: boolean = false): void {
        let newSearchValues = [{field, values: [value]}];

        if (searchValues.length > 0) {
            newSearchValues = searchValues.reduce<SearchValues[]>((acc, item) => {
                let values = item.values;
                if (item.field === field) {
                    if (!replace && !values.includes(value)) {
                        values.push(value);
                    }
                    else if (replace) {
                        values = [value];
                    }
                }
                if (values.length > 0) {
                    acc.push({field: item.field, values});
                }
                return acc;
            }, []);

            if (!newSearchValues.find(item => item.field === field)) {
                newSearchValues.push({field, values: [value]});
            }
        }

        onSearch(newSearchValues, 1);
    }

    return {
        searchValues,
        labeledSearchValues,
        registerFacet,
        unregisterFacet,
        selectPage,
        prevPage,
        nextPage,
        resetFacets,
        removeFacet,
        setFacet
    };
}
