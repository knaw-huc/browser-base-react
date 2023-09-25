import React, { FunctionComponent, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';
import Search, { createSearchLoader, SearchProps } from './components/search.js';
import Detail, { createDetailLoader, DetailProps } from './components/detail.js';
import FreeTextFacet from './facets/freeTextFacet.js';
import ListFacet from './facets/listFacet.js';
import { IMetadata, ISendCandidate } from './misc/interfaces.js';
import './index.css';
interface BrowserBaseProps<D, R> extends IMetadata, DetailProps<D>, SearchProps<R> {
    appComponent?: FunctionComponent<{
        children: ReactElement;
    }>;
    headerElement?: ReactElement;
    footerElement?: ReactElement;
    rootElement?: ReactElement;
    childRoutes?: RouteObject[];
    searchUrl: string;
    pageLength?: number;
    sortOrder?: string;
    getFetchUrl: (id: string) => string;
}
declare function BrowserBase<D, R>(props: BrowserBaseProps<D, R>): React.JSX.Element;
export { BrowserBase, BrowserBaseProps, Search, SearchProps, createSearchLoader, Detail, DetailProps, createDetailLoader, ISendCandidate, FreeTextFacet, ListFacet };
