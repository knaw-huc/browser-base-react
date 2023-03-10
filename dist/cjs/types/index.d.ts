import { ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { SearchProps } from './components/search.js';
import { DetailProps } from './components/detail.js';
import FreeTextFacet from './facets/freeTextFacet.js';
import ListFacet from './facets/listFacet.js';
import { IMetadata, ISendCandidate } from './misc/interfaces.js';
import './index.css';
interface BrowserBaseProps<D, R> extends IMetadata, DetailProps<D>, SearchProps<R> {
    headerElement?: ReactElement;
    footerElement?: ReactElement;
    rootElement?: ReactElement;
    childRoutes?: RouteObject[];
    searchUrl: string;
    pageLength?: number;
    sortOrder?: string;
    getFetchUrl: (id: string) => string;
}
declare function BrowserBase<D, R>(props: BrowserBaseProps<D, R>): JSX.Element;
export { BrowserBase, BrowserBaseProps, FreeTextFacet, ListFacet, ISendCandidate };
