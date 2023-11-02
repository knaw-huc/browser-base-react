import { SearchObject } from '../hooks/useSearch.js';
export default function createSearchLoader<I>(searchCodeLoader: (i: I) => SearchObject, searchUrl: string, initialPageLength?: number, initialSortOrder?: string): (i?: I) => Promise<any[]>;
