import { FunctionComponent } from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';
import { ISendCandidate, ISearchObject } from '../misc/interfaces';
export interface SearchProps<R> {
    title: string;
    resultItemComponent: FunctionComponent<{
        item: R;
    }>;
    facetsComponent: FunctionComponent<{
        sendCandidateHandler: ISendCandidate;
    }>;
}
export declare function createSearchLoader(searchUrl: string, pageLength?: number, sortOrder?: string): ({ params }: LoaderFunctionArgs) => Promise<{
    searchStruc: ISearchObject;
    result: any;
}>;
export default function Search<R>(props: SearchProps<R>): JSX.Element;
