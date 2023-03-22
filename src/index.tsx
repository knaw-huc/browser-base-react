import React, {ReactElement} from 'react';
import {RouteObject, RouterProvider, Outlet, createBrowserRouter} from 'react-router-dom';

import Home from './components/home.js';
import Search, {createSearchLoader, SearchProps} from './components/search.js';
import Detail, {createDetailLoader, DetailProps} from './components/detail.js';

import FreeTextFacet from './facets/freeTextFacet.js';
import ListFacet from './facets/listFacet.js';

import PageHeader from './pageElements/pageHeader.js';
import {IMetadata, ISendCandidate} from './misc/interfaces.js';

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

function BrowserBase<D, R>(props: BrowserBaseProps<D, R>) {
    const routeObject: RouteObject = {
        path: '/',
        element: <App header={props.headerElement || <PageHeader title={props.title}/>}
                      footer={props.footerElement}/>,
        children: [
            ...(props.childRoutes || []),
            {
                index: true,
                element: props.rootElement || <Home title={props.title} description={props.description}/>
            }, {
                path: 'search/:code',
                loader: createSearchLoader(props.searchUrl, props.pageLength, props.sortOrder),
                element: <Search title={props.title}
                                 withPaging={props.withPaging}
                                 facetsComponent={props.facetsComponent}
                                 resultItemComponent={props.resultItemComponent}
                                 headersElement={props.headersElement}/>
            }, {
                path: 'detail/:id',
                loader: createDetailLoader(props.getFetchUrl),
                element: <Detail title={props.title} detailComponent={props.detailComponent}/>
            }
        ]
    };

    return <RouterProvider router={createBrowserRouter([routeObject])}/>;
}

function App(props: { header: ReactElement, footer?: ReactElement }) {
    return (
        <>
            {props.header}
            <Outlet/>
            {props.footer}
        </>
    );
}

export {
    BrowserBase, BrowserBaseProps,
    Search, SearchProps, createSearchLoader,
    Detail, DetailProps, createDetailLoader,
    ISendCandidate, FreeTextFacet, ListFacet
}
