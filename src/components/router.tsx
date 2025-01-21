import React, {FunctionComponent, ReactElement} from 'react';
import {
    createBrowserRouter,
    LoaderFunctionArgs,
    Outlet,
    RouteObject,
    RouterProvider,
    ScrollRestoration
} from 'react-router-dom';
import App from './app.js';
import PageHeader, {PageHeaderProps} from './pageHeader.js';
import Home, {HomeProps} from './home.js';
import Search, {SearchParams, SearchProps} from './search.js';
import Detail, {DetailProps} from './detail.js';
import createSearchLoader from '../loaders/searchLoader.js';
import {getSearchObjectFromCode, getSearchObjectFromParams} from '../misc/search.js';
import './router.css';

export interface RouterProps<D, R> extends PageHeaderProps, HomeProps, DetailProps<D>, SearchProps<R> {
    title: string;
    AppComponent?: FunctionComponent<{ children: ReactElement | ReactElement[] }>;
    headerElement?: ReactElement;
    footerElement?: ReactElement;
    rootElement?: ReactElement;
    childRoutes?: RouteObject[];
    searchUrl: string;
    sortOrder?: string;
    getFetchUrl: (id: string) => string;
}

export default function Router<D, R>(props: RouterProps<D, R>) {
    props = {
        hasIndexPage: true,
        withPaging: true,
        updateDocumentTitle: true,
        showSearchHeader: true,
        searchParams: SearchParams.CODE,
        ...props
    };

    const appElement = props.AppComponent ? (
        <props.AppComponent>
            <ScrollRestoration/>
            <Outlet/>
        </props.AppComponent>
    ) : (
        <App header={props.headerElement ||
            <PageHeader title={props.title} logo={props.logo} items={props.items}/>} footer={props.footerElement}/>
    );

    let searchLoader, searchPath;
    switch (props.searchParams) {
        case SearchParams.PARAMS:
            const paramsSearchLoader = createSearchLoader(getSearchObjectFromParams, props.searchUrl, props.pageLength, props.sortOrder);
            searchLoader = async ({request}: LoaderFunctionArgs) => paramsSearchLoader(new URL(request.url).searchParams);
            searchPath = props.hasIndexPage ? null : 'search';
            break;
        case SearchParams.CODE:
        default:
            const codeSearchLoader = createSearchLoader(getSearchObjectFromCode, props.searchUrl, props.pageLength, props.sortOrder);
            searchLoader = async ({params}: LoaderFunctionArgs) => codeSearchLoader(params.code);
            searchPath = props.hasIndexPage ? 'search/:code?' : ':code?';
    }

    const detailLoader = async ({params}: LoaderFunctionArgs) => fetch(props.getFetchUrl(params.id as string));

    const searchElement =
        <Search title={props.title} pageLength={props.pageLength} hasIndexPage={props.hasIndexPage}
                withPaging={props.withPaging} updateDocumentTitle={props.updateDocumentTitle}
                searchParams={props.searchParams}
                FacetsComponent={props.FacetsComponent} ResultItemComponent={props.ResultItemComponent}
                headersElement={props.headersElement}/>;

    const children: RouteObject[] = [
        ...(props.childRoutes || []),
        {
            index: true,
            loader: props.hasIndexPage ? undefined : searchLoader,
            element: props.hasIndexPage
                ? props.rootElement || <Home title={props.title} description={props.description}/>
                : searchElement,

        }, {
            path: 'detail/:id',
            loader: detailLoader,
            element: <Detail title={props.title} DetailComponent={props.DetailComponent}/>
        }
    ];

    if (searchPath !== null) {
        children.push({
            path: searchPath,
            loader: searchLoader,
            element: searchElement
        });
    }

    const routeObject: RouteObject = {
        path: '/',
        element: appElement,
        children
    };

    return <RouterProvider router={createBrowserRouter([routeObject])}/>;
}
