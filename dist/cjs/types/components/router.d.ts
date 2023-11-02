import React, { FunctionComponent, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { HomeProps } from './home.js';
import { SearchProps } from './search.js';
import { DetailProps } from './detail.js';
import './router.css';
export interface RouterProps<D, R> extends HomeProps, DetailProps<D>, SearchProps<R> {
    title: string;
    AppComponent?: FunctionComponent<{
        children: ReactElement | ReactElement[];
    }>;
    headerElement?: ReactElement;
    footerElement?: ReactElement;
    rootElement?: ReactElement;
    childRoutes?: RouteObject[];
    searchUrl: string;
    sortOrder?: string;
    getFetchUrl: (id: string) => string;
}
export default function Router<D, R>(props: RouterProps<D, R>): React.JSX.Element;
