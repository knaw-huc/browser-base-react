import {createRoot} from 'react-dom/client';
import {Router, FreeTextFacet, ListFacet} from '@knaw-huc/browser-base-react';
import serverMockWorker from './serverMock.ts';

await serverMockWorker.start();
createRoot(document.getElementById('root')!).render(<App/>);

function App() {
    return (
        <Router title="Example browser"
                description="Find something that suits your needs!"
                getFetchUrl={id => 'https://example.org/detail?rec=' + id}
                searchUrl="https://example.org/browse"
                pageLength={10}
                DetailComponent={MyDetail}
                ResultItemComponent={MyListDetails}
                facetsElement={<MyFacets/>}/>
    );
}

function MyDetail({data: {title, content}}: { data: { id: number, title: string, content: string } }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
}

function MyListDetails({item: {id, title, content}}: { item: { id: number, title: string, content: string } }) {
    return (
        <div>
            <h3><a href={`/detail/${id}`}>{title}</a></h3>
            <p>{content}</p>
        </div>
    );
}

function MyFacets() {
    return (
        <>
            <FreeTextFacet/>
            <ListFacet name="Profession" field="profession" url="https://example.org/facet"/>
        </>
    );
}
