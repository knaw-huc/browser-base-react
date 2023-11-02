import {SearchObject} from '../hooks/useSearch.js';

export default function createSearchLoader<I>(searchCodeLoader: (i: I) => SearchObject, searchUrl: string,
                                              initialPageLength?: number, initialSortOrder?: string) {
    return async (i?: I) => {
        const searchStruc = {
            ...(i ? searchCodeLoader(i) : {searchvalues: [], page: 1}),
            page_length: initialPageLength,
            sortorder: initialSortOrder,
        };

        const result = await fetch(searchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchStruc)
        });

        return [searchStruc, await result.json()];
    }
}

