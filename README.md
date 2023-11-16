# Browser base (React)

Set up a browser interface using React and React Router. Requires minimal React 18.0.0 and React Router 6.8.0.

Install the package using:
`npm install knaw-huc/browser-base-react`

Build the package using:
`npm run build`

## Usage

The plugin comes with a `BrowserBase` component or the individual `Search` and `Detail` components and multiple facet
components.

### `BrowserBase`

The React component `BrowserBase` can be used to set up the browser interface:

```jsx
<BrowserBase title="My browser!"
             description="Find something that suits your needs!"
             getFetchUrl={id => 'http://localhost:5000/detail?rec=' + id}
             searchUrl="http://localhost:5000/browse"
             detailComponent={MyDetail}
             resultItemComponent={MyListDetails}
             facetsComponent={MyFacets}/>

function MyDetail(params) {
    return <div>{params.data}</div>;
}

function MyListDetails(params) {
    return <div>{params.item}</div>;
}

function MyFacets(params) {
    return <>
        <FreeTextFacet add={params.sendCandidateHandler}/>
        <ListFacet parentCallback={params.sendCandidateHandler}
                   name="Title" field="title" url="http://localhost:5000/facet"/>
        <FilteredListFacet parentCallback={params.sendCandidateHandler}
                   name="Author" field="author" url="http://localhost:5000/filtered-facet"/>
    </>;
}
```

All available parameters:

| Parameter             | Value type               | Required |                                                                                                                                                  |
|-----------------------|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `noIndexPage`         | `boolean`                |          | If the index page should be disabled and immediately show the search index ; if absent it defaults to `false`                                    |   
| `title`               | `string`                 | ✓        | The title of the browser                                                                                                                         |
| `description`         | `string`                 |          | The description of the browser                                                                                                                   |
| `appComponent`        | `FunctionComponent`      |          | A React component to render the app component; has to accept children for the React Browser Outlet                                               |
| `headerElement`       | `ReactElement`           |          | The header to render; if absent a default header is placed with the title                                                                        |
| `footerElement`       | `ReactElement`           |          | The footer to render; if absent no footer is rendered                                                                                            |
| `rootElement`         | `ReactElement`           |          | The root page to render; if absent a default root page with the title and description is rendered                                                |
| `childRoutes`         | `RouteObject[]`          |          | Additional child routes to add to the React Router component                                                                                     |
| `searchUrl`           | `string`                 | ✓        | The URL to use for searching                                                                                                                     |
| `pageLength`          | `number`                 |          | The default page length                                                                                                                          |
| `sortOrder`           | `number`                 |          | The default sort order                                                                                                                           |
| `withPaging`          | `boolean`                |          | If paging should be enabled; if absent it defaults to `false`                                                                                    |
| `getFetchUrl`         | `(id: string) => string` | ✓        | A function that receives an identifier and returns the URL to obtain the item data                                                               |
| `detailComponent`     | `FunctionComponent`      | ✓        | A React component to render an item; has to accept a parameter `data` with the data object                                                       |
| `resultItemComponent` | `FunctionComponent`      | ✓        | A React component to render an item in the result list; has to accept a parameter `item` with the item object                                    |
| `facetsComponent`     | `FunctionComponent`      | ✓        | A React component with the facets to render for searching; has to accept a parameter `sendCandidateHandler` to propagate to the facet components |
| `headersElement`      | `ReactElement`           |          | A React component with the headers to render for searching                                                                                       |

### Search and Detail

The React components `Search` and `Detail` can be used to set up your own routing for the search and detail pages. To
create loader for React Router, use the helper functions `createSearchLoader` and `createDetailLoader`. Make sure to
include `code` in the search URL and `id` in the detail URL:

```jsx
const searchLoader = createSearchLoader("http://localhost:5000/browse");
const detailLoader = createDetailLoader(id => 'http://localhost:5000/detail?rec=' + id);

<Search title="My browser!"
        resultItemComponent={MyListDetails}
        facetsComponent={MyFacets}/>

<Detail title="My browser!"
        detailComponent={MyDetail}/>

function MyDetail(params) {
    return <div>{params.data}</div>;
}

function MyListDetails(params) {
    return <div>{params.item}</div>;
}

function MyFacets(params) {
    return <>
        <FreeTextFacet add={params.sendCandidateHandler}/>
        <ListFacet parentCallback={params.sendCandidateHandler}
                   name="Title" field="title" url="http://localhost:5000/facet"/>
        <FilteredListFacet parentCallback={params.sendCandidateHandler}
                           name="Author" field="author" url="http://localhost:5000/filtered-facet"/>
        <ListFacet parentCallback={params.sendCandidateHandler}
                   name="Has a car (Yes/No)" field="has_car" url="http://localhost:5000/facet" flex={false}/>
    </>;
}
```

### Facets

There are a number of facets to choose from:

#### Free text

A component `FreeTextFacet` to allow for free text searching which accepts the parameters:

| Parameter | Value type       | Required |                                                        |
|-----------|------------------|----------|--------------------------------------------------------|
| `add`     | `ISendCandidate` | ✓        | To propagate the given `sendCandidateHandler` function |    

#### List facet

A component `ListFacet` to render a list of possible values to filter on which accepts the parameters:

| Parameter        | Value type       | Required |                                                        |
|------------------|------------------|----------|--------------------------------------------------------|
| `parentCallback` | `ISendCandidate` | ✓        | To propagate the given `sendCandidateHandler` function |     
| `name`           | `string`         | ✓        | To (human readable) name of the facet                  |
| `field`          | `string`         | ✓        | To (technical) field of the facet                      |
| `url`            | `string`         | ✓        | The URL to obtain the possible values from             |
| `flex`           | `boolean`        |          | Possibility to change list size (default = true)       |

#### Filtered list facet

A component `FiteredListFacet` like the `ListFacet`, but with a text field to narrow down the amount of list items

| Parameter        | Value type       | Required |                                                        |
|------------------|------------------|----------|--------------------------------------------------------|
| `parentCallback` | `ISendCandidate` | ✓        | To propagate the given `sendCandidateHandler` function |     
| `name`           | `string`         | ✓        | To (human readable) name of the facet                  |
| `field`          | `string`         | ✓        | To (technical) field of the facet                      |
| `url`            | `string`         | ✓        | The URL to obtain the possible values from             |

