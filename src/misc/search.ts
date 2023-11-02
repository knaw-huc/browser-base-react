import {decode, encode} from './base64.js';
import {SearchObject} from '../hooks/useSearch.js';

export function createCodeFromSearchObject(searchObject: SearchObject): string {
    return encode(JSON.stringify(searchObject));
}

export function getSearchObjectFromCode(code?: string): SearchObject {
    if (code) {
        return JSON.parse(decode(code));
    }

    return {
        searchvalues: [],
        page: 1
    };
}

export function createParamsFromSearchObject(searchObject: SearchObject): URLSearchParams {
    const params = new URLSearchParams();

    for (const searchValue of searchObject.searchvalues) {
        for (const value of searchValue.values) {
            params.append(searchValue.field, value);
        }
    }

    params.set('page', searchObject.page.toString());
    if (searchObject.page_length) {
        params.set('page_length', searchObject.page_length.toString());
    }
    if (searchObject.sortorder) {
        params.set('sort', searchObject.sortorder);
    }

    return params;
}

export function getSearchObjectFromParams(params: URLSearchParams): SearchObject {
    const page = params.get('page');
    const page_length = params.get('page_length');
    const sort = params.get('sort');

    return {
        searchvalues: [...new Set(params.keys())]
            .filter(field => !['page', 'page_length', 'sort'].includes(field))
            .map(field => ({
                field, values: params.getAll(field)
            })),
        page: page && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        page_length: page_length && !isNaN(parseInt(page_length)) ? parseInt(page_length) : undefined,
        sortorder: sort ? sort : undefined,
    };
}
