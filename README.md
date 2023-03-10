# Browser base (React)

Set up a browser interface using React and React Router. Requires minimal React 18.0.0 and React Router 6.8.0.

Install the package using:
`npm install knaw-huc/browser-base-react`

Build the package using:
`npm run build`

## Usage

The plugin comes with a `BrowserBase` component and multiple facet components.

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
    </>;
}
```

All available parameters:

| Parameter             | Value type               | Required |                                                                                                                                                  |
|-----------------------|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`               | `string`                 | ✓        | The title of the browser                                                                                                                         |
| `description`         | `string`                 | ✓        | The description of the browser                                                                                                                   |
| `headerElement`       | `ReactElement`           |          | The header to render; if absent a default header is placed with the title                                                                        |
| `footerElement`       | `ReactElement`           |          | The footer to render; if absent no footer is rendered                                                                                            |
| `rootElement`         | `ReactElement`           |          | The root page to render; if absent a default root page with the title and description is rendered                                                |
| `childRoutes`         | `RouteObject[]`          |          | Additional child routes to add to the React Router component                                                                                     |
| `searchUrl`           | `string`                 | ✓        | The URL to use for searching                                                                                                                     |
| `pageLength`          | `number`                 |          | The default page length                                                                                                                          |
| `sortOrder`           | `number`                 |          | The default sort order                                                                                                                           |
| `getFetchUrl`         | `(id: string) => string` | ✓        | A function that receives an identifier and returns the URL to obtain the item data                                                               |
| `detailComponent`     | `FunctionComponent`      | ✓        | A React component to render an item; has to accept a parameter `data` with the data object                                                       |
| `resultItemComponent` | `FunctionComponent`      | ✓        | A React component to render an item in the result list; has to accept a parameter `item` with the item object                                    |
| `facetsComponent`     | `FunctionComponent`      | ✓        | A React component with the facets to render for searching; has to accept a parameter `sendCandidateHandler` to propagate to the facet components |

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
