import React, {createContext, useState, ReactNode} from 'react';

interface SearchContextProviderProps {
    searchValues: SearchValues[];
    page: number;
    onSearch: (searchValues: SearchValues[], page: number) => void;
    children: ReactNode;
}

export interface Facets {
    [field: string]: string;
}

export interface SearchValues {
    field: string,
    values: string[]
}

export const SearchContext = createContext<{
    facets: Facets;
    setFacets: (facets: Facets | ((prevFacets: Facets) => Facets)) => void;
    searchValues: SearchValues[];
    page: number;
    onSearch: (searchValues: SearchValues[], page: number) => void;
}>({
    facets: {},
    setFacets: () => {
    },
    searchValues: [],
    page: 1,
    onSearch: () => {
    }
});

export function SearchContextProvider({searchValues, page, onSearch, children}: SearchContextProviderProps) {
    const [facets, setFacets] = useState<Facets>({});

    return (
        <SearchContext.Provider value={{facets, setFacets, searchValues, page, onSearch}}>
            {children}
        </SearchContext.Provider>
    );
}
