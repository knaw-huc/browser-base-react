import React, {FunctionComponent, ReactElement} from 'react';
import {Link, RouteObject, RouterProvider, Outlet, createBrowserRouter} from 'react-router-dom';

import Search, {createSearchLoader, SearchProps} from './components/search.js';
import Detail, {createDetailLoader, DetailProps} from './components/detail.js';

import FreeTextFacet from './facets/freeTextFacet.js';
import ListFacet from './facets/listFacet.js';

import PageHeader from './pageElements/pageHeader.js';
import {IMetadata, ISendCandidate} from './misc/interfaces.js';

import './index.css';

interface BrowserBaseProps<D, R> extends IMetadata, DetailProps<D>, SearchProps<R> {
    appComponent?: FunctionComponent<{ children: ReactElement }>;
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
    const appElement = props.appComponent ? (
        <props.appComponent>
            <Outlet/>
        </props.appComponent>
    ) : (
        <App header={props.headerElement || <PageHeader title={props.title}/>}
             footer={props.footerElement}/>
    );

    const searchLoader = createSearchLoader(props.searchUrl, props.pageLength, props.sortOrder);
    const searchElement = <Search title={props.title}
                                  noIndexPage={props.noIndexPage}
                                  withPaging={props.withPaging}
                                  facetsComponent={props.facetsComponent}
                                  resultItemComponent={props.resultItemComponent}
                                  headersElement={props.headersElement}/>;

    const routeObject: RouteObject = {
        path: '/',
        element: appElement,
        children: [
            ...(props.childRoutes || []),
            {
                index: true,
                loader: props.noIndexPage ? searchLoader : undefined,
                element: props.noIndexPage
                    ? searchElement
                    : props.rootElement || <Home title={props.title} description={props.description}/>,

            }, {
                path: props.noIndexPage ? ':code' : 'search/:code',
                loader: searchLoader,
                element: searchElement
            }, {
                path: 'detail/:id',
                loader: createDetailLoader(props.getFetchUrl),
                element: <Detail title={props.title} detailComponent={props.detailComponent}/>
            }
        ]
    };

    return <RouterProvider router={createBrowserRouter([routeObject])}/>;
}

function Home(props: IMetadata) {
    document.title = props.title;

    return (
        <div className="hcContentContainer">
            <h2>{props.title}</h2>
            {props.description && <p>{props.description}</p>}
            <Link to="search/">Browse</Link>
        </div>
    );
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
