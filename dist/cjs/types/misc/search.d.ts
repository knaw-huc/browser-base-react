import { SearchObject } from '../hooks/useSearch.js';
export declare function createCodeFromSearchObject(searchObject: SearchObject): string;
export declare function getSearchObjectFromCode(code?: string): SearchObject;
export declare function createParamsFromSearchObject(searchObject: SearchObject): URLSearchParams;
export declare function getSearchObjectFromParams(params: URLSearchParams): SearchObject;
