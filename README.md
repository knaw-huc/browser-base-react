# Browser base (React)

Set up a search/browser interface using React (and React Router). Requires React 18 and optionally React Router 6.4.

Install the package using:
`npm install @knaw-huc/browser-base-react`

Build the package using:
`npm run build`

You can use the hooks to embed the logic into your own React components or use the components with a predefined layout.
Or use the `Router` component to quickly set up a browser interface using React Router.

1. [Hooks](#hooks)
    1. [Hook `useSearch`](#hook-usesearch)
    2. [Hook `useFreeTextFacet`](#hook-usefreetextfacet)
    3. [Hook `useListFacet`](#hook-uselistfacet)
    4. [Hook `useSliderFacet`](#hook-usesliderfacet)
2. [Components](#components)
    1. [Component `Router`](#component-router)
    2. [Components `Search` and `Detail`](#components-search-and-detail)
        1. [Component `Search`](#component-search)
        2. [Component `Detail`](#component-detail)
    3. [Facet components](#facet-components)
        1. [Component `FreeTextFacet`](#component-freetextfacet)
        2. [Component `ListFacet`](#component-listfacet)
        3. [Component `SliderFacet`](#component-sliderfacet)
3. [Utilities](#utilities)
    1. [Base64 utilities](#base64-utilities)
    2. [Paging utilities](#paging-utilities)
    3. [Search utilities](#search-utilities)

## Hooks

### Hook `useSearch`

The `useSearch` hook is used to set up a Search interface. The hook is initialized with the following parameters:

| Parameter      | Value type                                                            |                                                                      |
|----------------|-----------------------------------------------------------------------|----------------------------------------------------------------------|
| `searchValues` | <pre>{<br>&emsp;field: string,<br>&emsp;values: string[]<br>}[]</pre> | The search values selected by the user                               |
| `page`         | `number`                                                              | The current page number                                              |
| `onSearch`     | `(searchValues, page) => void`                                        | To call when either the search values or the current page is changed |

It returns an array with the following functions for user interaction:

| Value                 | Signature                                                                                     |                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------|
| `labeledSearchValues` | <pre>{<br>&emsp;field: string,<br>&emsp;label: string,<br>&emsp;values: string[]<br>}[]</pre> | The search values selected by the user with labels |
| `registerFacet`       | `(field: string, label: string) => void`                                                      | Register a facet                                   |
| `unregisterFacet`     | `(field: string) => void`                                                                     | Unregister a facet                                 |
| `selectPage`          | `(page: number) => void`                                                                      | Change the page number                             | 
| `prevPage`            | `() => void`                                                                                  | Go to the previous page                            |
| `nextPage`            | `() => void`                                                                                  | Go to the next page                                |
| `resetFacets`         | `() => void`                                                                                  | Reset all facets                                   |
| `removeFacet`         | `(field: string, value: string) => void`                                                      | Remove a facet with the given value                |
| `setFacet`            | `(field: string, value: string) => void`                                                      | Add a facet with the given value                   |

### Hook `useFreeTextFacet`

The `useFreeTextFacet` hook is used to set up a facet with free text search. The hook is initialized with the following
parameters:

| Parameter         | Value type                               |                                               |
|-------------------|------------------------------------------|-----------------------------------------------|
| `registerFacet`   | `(field: string, label: string) => void` | To register the facet with a label            |
| `unregisterFacet` | `(field: string) => void`                | To unregister the facet                       |
| `setFacet`        | `(field: string, value: string) => void` | To call whenever a facet is added by the user |
| `label`           | `string`                                 | The label (defaults to `Free text`)           |
| `field`           | `string`                                 | The field name (defaults to `FREE_TEXT`)      |

It returns an array with the following values/functions for user interaction:

| Value            | Signature            |                               |
|------------------|----------------------|-------------------------------|
| `textField`      | `string`             | The value of the search field | 
| `setTextFacet`   | `() => void`         | Submit the search value       |
| `handleChange`   | `(e: event) => void` | Change event handler          |
| `handleKeyPress` | `(e: event) => void` | Key press event handler       |

### Hook `useListFacet`

The `useListFacet` hook is used to set up a facet with a list. The hook is initialized with the following
parameters:

| Parameter         | Value type                                                            |                                                                                                                 |
|-------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `label`           | `string`                                                              | The label of the facet                                                                                          |
| `field`           | `string`                                                              | The field of the facet                                                                                          |
| `url`             | `string`                                                              | The URL to obtain the facet values from                                                                         |
| `registerFacet`   | `(field: string, label: string) => void`                              | To register the facet with a label                                                                              |
| `unregisterFacet` | `(field: string) => void`                                             | To unregister the facet                                                                                         |
| `setFacet`        | `(field: string, value: string) => void`                              | To call whenever a facet is added by the user                                                                   |
| `searchValues`    | <pre>{<br>&emsp;field: string,<br>&emsp;values: string[]<br>}[]</pre> | The search values selected by the user (optional)                                                               |
| `usePost`         | `boolean`                                                             | Whether to do a POST call to obtain the values; is required for the use of `searchValues` (defaults to `false`) |
| `startAmount`     | `number`                                                              | The number of initial values to show (defaults to `10`)                                                         |
| `moreAmount`      | `number`                                                              | The upper limit for all values to show (defaults to `500`)                                                      |

It returns an array with the following values/functions for user interaction:

| Value              | Signature                                 |                                               |
|--------------------|-------------------------------------------|-----------------------------------------------|
| `data`             | `{key: key: string, doc_count: number}[]` | The facet values                              | 
| `loading`          | `boolean`                                 | Whether the values are still loading          | 
| `hidden`           | `boolean`                                 | Whether the values are hidden                 |
| `setHidden`        | `(hidden: boolean) => void`               | Whether the values should be hidden           |
| `more`             | `boolean`                                 | Whether to show more values                   |
| `changeListLength` | `() => void`                              | Toggle between more or less values to show    |
| `sendCandidate`    | `(value: string) => void`                 | To call whenever a facet is added by the user |
| `handleChange`     | `(e: event) => void`                      | Change event handler                          |

### Hook `useSliderFacet`

The `useSliderFacet` hook is used to set up a facet with a slider. The hook is initialized with the following
parameters:

| Parameter         | Value type                               |                                               |
|-------------------|------------------------------------------|-----------------------------------------------|
| `label`           | `string`                                 | The label of the facet                        |
| `field`           | `string`                                 | The field of the facet                        |
| `registerFacet`   | `(field: string, label: string) => void` | To register the facet with a label            |
| `unregisterFacet` | `(field: string) => void`                | To unregister the facet                       |
| `setFacet`        | `(field: string, value: string) => void` | To call whenever a facet is added by the user |
| `min`             | `number`                                 | The minimum allowed value                     |
| `max`             | `number`                                 | The maximum allowed value                     |

It returns an array with the following values/functions for user interaction:

| Value          | Signature                            |                                                    |
|----------------|--------------------------------------|----------------------------------------------------|
| `from`         | `number`                             | The current start range value set by the user      | 
| `to`           | `number`                             | The current end range value set by the user        | 
| `hidden`       | `boolean`                            | Whether the values are hidden                      |
| `setHidden`    | `(hidden: boolean) => void`          | Whether the values should be hidden                |
| `handleChange` | `(from: number, to: number) => void` | Change event handler accepting a new range         |
| `sendSelect`   | `() => void`                         | To call whenever the range is selected by the user |

## Components

### Component `Router`

The React component `Router` can be used to set up the browser interface:

```jsx
<Router title="My browser!"
        description="Find something that suits your needs!"
        getFetchUrl={id => 'http://localhost:5000/detail?rec=' + id}
        searchUrl="http://localhost:5000/browse"
        DetailComponent={MyDetail}
        ResultItemComponent={MyListDetails}
        FacetsComponent={MyFacets}/>

function MyDetail(params) {
    return <div>{params.data}</div>;
}

function MyListDetails(params) {
    return <div>{params.item}</div>;
}

function MyFacets(params) {
    return <>
        <FreeTextFacet
            registerFacet={params.registerFacet}
            unregisterFacet={params.unregisterFacet}
            setFacet={params.setFacet}/>
        <ListFacet
            registerFacet={params.registerFacet}
            unregisterFacet={params.unregisterFacet}
            setFacet={params.setFacet}
            searchValues={params.searchValues}
            name="Title" field="title" url="http://localhost:5000/facet"/>
    </>;
}
```

All available parameters:

| Parameter             | Value type                                                                                                                                                                                                                                              | Required |                                                                                                                                                                                                                                                     |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`               | `string`                                                                                                                                                                                                                                                | ✓        | The title of the browser                                                                                                                                                                                                                            |
| `description`         | `string`                                                                                                                                                                                                                                                |          | The description of the browser                                                                                                                                                                                                                      |
| `updateDocumentTitle` | `boolean`                                                                                                                                                                                                                                               |          | If the document title should be updated; if absent it defaults to `true`                                                                                                                                                                            |
| `logo`                | `ReactElement`                                                                                                                                                                                                                                          |          | The logo to show in the header element                                                                                                                                                                                                              |
| `items`               | `ReactElement`                                                                                                                                                                                                                                          |          | The items to show in the header element                                                                                                                                                                                                             |
| `AppComponent`        | `FunctionComponent`                                                                                                                                                                                                                                     |          | A React component to render the app component; has to accept children for the React Browser Outlet                                                                                                                                                  |
| `headerElement`       | `ReactElement`                                                                                                                                                                                                                                          |          | The header to render; if absent a default header is placed with the title, logo and header items                                                                                                                                                    |
| `footerElement`       | `ReactElement`                                                                                                                                                                                                                                          |          | The footer to render; if absent no footer is rendered                                                                                                                                                                                               |
| `rootElement`         | `ReactElement`                                                                                                                                                                                                                                          |          | The root page to render; if absent a default root page with the title and description is rendered                                                                                                                                                   |
| `childRoutes`         | `RouteObject[]`                                                                                                                                                                                                                                         |          | Additional child routes to add to the React Router component                                                                                                                                                                                        |
| `searchUrl`           | `string`                                                                                                                                                                                                                                                | ✓        | The URL to use for searching                                                                                                                                                                                                                        |
| `pageLength`          | `number`                                                                                                                                                                                                                                                |          | The default page length                                                                                                                                                                                                                             |
| `sortOrder`           | `number`                                                                                                                                                                                                                                                |          | The default sort order                                                                                                                                                                                                                              |
| `hasIndexPage`        | `boolean`                                                                                                                                                                                                                                               |          | If the index page should be disabled and immediately show the search index ; if absent it defaults to `true`                                                                                                                                        |   
| `withPaging`          | `boolean`                                                                                                                                                                                                                                               |          | If paging should be enabled; if absent it defaults to `false`                                                                                                                                                                                       |
| `showSearchHeader`    | `boolean`                                                                                                                                                                                                                                               |          | If the search header should be shown; if absent it defaults to `true`                                                                                                                                                                               | 
| `searchParams`        | `SearchParams { CODE, PARAMS }`                                                                                                                                                                                                                         |          | How to obtain search parameters (using a code, or using URL parameters) ; if absent it defaults to `SearchParams.CODE`                                                                                                                              |
| `getFetchUrl`         | `(id: string) => string`                                                                                                                                                                                                                                | ✓        | A function that receives an identifier and returns the URL to obtain the item data                                                                                                                                                                  |
| `DetailComponent`     | `FunctionComponent`                                                                                                                                                                                                                                     | ✓        | A React component to render an item; has to accept a parameter `data` with the data object                                                                                                                                                          |
| `ResultItemComponent` | `FunctionComponent`                                                                                                                                                                                                                                     | ✓        | A React component to render an item in the result list; has to accept a parameter `item` with the item object                                                                                                                                       |
| `FacetsComponent`     | <pre>FunctionComponent<{<br>&emsp;registerFacet: (field: string, label: string) => void,<br>&emsp;unregisterFacet: (field: string) => void,<br>&emsp;setFacet: (field: string, value: string) => void<br>&emsp;searchValues: SearchValues[]<br>}></pre> | ✓        | A React component with the facets to render for searching ; has to accept the parameters `registerFacet`, `unregisterFacet` and `setFacet` to pass along to each facet and the parameter `searchValues` for the facets that need the search context |
| `headersElement`      | `ReactElement`                                                                                                                                                                                                                                          |          | The headers to render for searching                                                                                                                                                                                                                 |

### Components `Search` and `Detail`

The React components `Search` and `Detail` can be used to set up your own routing for the search and detail pages. To
create loaders for React Router, use the helper functions `createSearchLoader` and `createDetailLoader`.

```jsx
const codeSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromCode, "http://localhost:5000/browse");
const paramsSearchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, "http://localhost:5000/browse");
const detailLoader = createDetailLoader(id => 'http://localhost:5000/detail?rec=' + id);

<Search title="My browser!"
        ResultItemComponent={MyListDetails}
        FacetsComponent={MyFacets}/>

<Detail title="My browser!"
        DetailComponent={MyDetail}/>

function MyDetail(params) {
    return <div>{params.data}</div>;
}

function MyListDetails(params) {
    return <div>{params.item}</div>;
}

function MyFacets(params) {
    return <>
        <FreeTextFacet
            registerFacet={params.registerFacet}
            unregisterFacet={params.unregisterFacet}
            setFacet={params.setFacet}/>
        <ListFacet
            registerFacet={params.registerFacet}
            unregisterFacet={params.unregisterFacet}
            setFacet={params.setFacet}
            searchValues={params.searchValues}
            name="Title" field="title" url="http://localhost:5000/facet"/>
    </>;
}
```

#### Component `Search`

A component `Search` to set up a search interface which accepts the parameters:

| Parameter             | Value type                                                                                                                                                                                                                                              | Required |                                                                                                                                                                                                                                                     |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`               | `string`                                                                                                                                                                                                                                                | ✓        | The title of the browser                                                                                                                                                                                                                            |
| `updateDocumentTitle` | `boolean`                                                                                                                                                                                                                                               |          | If the document title should be updated; if absent it defaults to `true`                                                                                                                                                                            |
| `showSearchHeader`    | `boolean`                                                                                                                                                                                                                                               |          | If the search header should be shown; if absent it defaults to `true`                                                                                                                                                                               | 
| `pageLength`          | `number`                                                                                                                                                                                                                                                |          | The default page length                                                                                                                                                                                                                             |
| `hasIndexPage`        | `boolean`                                                                                                                                                                                                                                               |          | If the index page should be disabled and immediately show the search index ; if absent it defaults to `true`                                                                                                                                        |   
| `withPaging`          | `boolean`                                                                                                                                                                                                                                               |          | If paging should be enabled; if absent it defaults to `false`                                                                                                                                                                                       |
| `searchParams`        | `SearchParams { CODE, PARAMS }`                                                                                                                                                                                                                         |          | How to obtain search parameters (using a code, or using URL parameters) ; if absent it defaults to `SearchParams.CODE`                                                                                                                              |
| `ResultItemComponent` | `FunctionComponent`                                                                                                                                                                                                                                     | ✓        | A React component to render an item in the result list; has to accept a parameter `item` with the item object                                                                                                                                       |
| `FacetsComponent`     | <pre>FunctionComponent<{<br>&emsp;registerFacet: (field: string, label: string) => void,<br>&emsp;unregisterFacet: (field: string) => void,<br>&emsp;setFacet: (field: string, value: string) => void<br>&emsp;searchValues: SearchValues[]<br>}></pre> | ✓        | A React component with the facets to render for searching ; has to accept the parameters `registerFacet`, `unregisterFacet` and `setFacet` to pass along to each facet and the parameter `searchValues` for the facets that need the search context |
| `headersElement`      | `ReactElement`                                                                                                                                                                                                                                          |          | The headers to render for searching                                                                                                                                                                                                                 |

#### Component `Detail`

A component `Detail` to set up a detail interface which accepts the parameters:

| Parameter             | Value type          | Required |                                                                                            |
|-----------------------|---------------------|----------|--------------------------------------------------------------------------------------------|
| `title`               | `string`            | ✓        | The title of the browser                                                                   |
| `updateDocumentTitle` | `boolean`           |          | If the document title should be updated; if absent it defaults to `true`                   |
| `DetailComponent`     | `FunctionComponent` | ✓        | A React component to render an item; has to accept a parameter `data` with the data object |

### Facet components

There are a number of facet components to choose from.

#### Component `FreeTextFacet`

A component `FreeTextFacet` to allow for free text searching which accepts the parameters:

| Parameter         | Value type                               | Required |                                               |
|-------------------|------------------------------------------|----------|-----------------------------------------------|
| `registerFacet`   | `(field: string, label: string) => void` | ✓        | To register the facet with a label            |
| `unregisterFacet` | `(field: string) => void`                | ✓        | To unregister the facet                       |
| `setFacet`        | `(field: string, value: string) => void` | ✓        | To call whenever a facet is added by the user |
| `name`            | `string`                                 |          | The label (defaults to `Free text`)           |
| `field`           | `string`                                 |          | The field name (defaults to `FREE_TEXT`)      |

#### Component `ListFacet`

A component `ListFacet` to render a list of possible values to filter on which accepts the parameters:

| Parameter         | Value type                                                            | Required |                                                                                                                 |
|-------------------|-----------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------|
| `registerFacet`   | `(field: string, label: string) => void`                              | ✓        | To register the facet with a label                                                                              |
| `unregisterFacet` | `(field: string) => void`                                             | ✓        | To unregister the facet                                                                                         |
| `setFacet`        | `(field: string, value: string) => void`                              | ✓        | To call whenever a facet is added by the user                                                                   |
| `name`            | `string`                                                              | ✓        | The label of the facet                                                                                          |
| `field`           | `string`                                                              | ✓        | The field of the facet                                                                                          |
| `url`             | `string`                                                              | ✓        | The URL to obtain the facet values from                                                                         |
| `searchValues`    | <pre>{<br>&emsp;field: string,<br>&emsp;values: string[]<br>}[]</pre> |          | The search values selected by the user (optional)                                                               |
| `usePost`         | `boolean`                                                             |          | Whether to do a POST call to obtain the values; is required for the use of `searchValues` (defaults to `false`) |
| `flex`            | `boolean`                                                             |          | Whether to show a toggle for more/less values (defaults to `true`)                                              |
| `addFilter`       | `boolean`                                                             |          | Whether to add a filter field to filter the facet values (defaults to `false`)                                  |

#### Component `SliderFacet`

A component `SliderFacet` to render a slider to filter on which accepts the parameters:

| Parameter         | Value type                               | Required |                                               |
|-------------------|------------------------------------------|----------|-----------------------------------------------|
| `registerFacet`   | `(field: string, label: string) => void` | ✓        | To register the facet with a label            |
| `unregisterFacet` | `(field: string) => void`                | ✓        | To unregister the facet                       |
| `setFacet`        | `(field: string, value: string) => void` | ✓        | To call whenever a facet is added by the user |
| `name`            | `string`                                 | ✓        | The label of the facet                        |
| `field`           | `string`                                 | ✓        | The field of the facet                        |
| `min`             | `number`                                 | ✓        | The minimum allowed value                     |
| `max`             | `number`                                 | ✓        | The maximum allowed value                     |

## Utilities

### Base64 utilities

A UTF-8 safe Base64 encoder and decoder.

```js
import {base64} from 'browser-base-react';

const encoded = base64.encode('Base64 encoding of the string');
const decoded = base64.decode(encoded);
```

### Paging utilities

Some utility functions to help with paging layouts.

```js
import {pagingUtils} from 'browser-base-react';

const pages = getPages(10); // getPages(noPages: number, startPage: number = 1)
console.log(pages); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const prevPages = getPrevPages(15); // getPrevPages(curPage: number, maxPages: number = 4)
console.log(prevPages); // [11, 12, 13, 14]

const nextPages = getNextPages(15, 18); // getNextPages(curPage: number, totalPages: number, maxPages: number = 4)
console.log(nextPages); // [16, 17, 18]
```

### Search utilities

Utilities to deal with the encoding and decoding of the search object.

```js
import {searchUtils} from 'browser-base-react';

const code = createCodeFromSearchObject({
    searchvalues: [{
        field: 'My field',
        values: ['Search value 1', 'Search value 2']
    }],
    page: 1
}); // createCodeFromSearchObject(searchObject: SearchObject)

const searchObject1 = getSearchObjectFromCode(code); // getSearchObjectFromCode(code?: string)

// --------------------------------------------------------------- //

const params = createParamsFromSearchObject({
    searchvalues: [{
        field: 'My field',
        values: ['Search value 1', 'Search value 2']
    }],
    page: 1
}); // createParamsFromSearchObject(searchObject: SearchObject)

const searchObject2 = getSearchObjectFromParams(params); // getSearchObjectFromParams(params: URLSearchParams)
```
