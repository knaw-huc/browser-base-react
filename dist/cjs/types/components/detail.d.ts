import { FunctionComponent } from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';
export interface DetailProps<D> {
    title: string;
    detailComponent: FunctionComponent<{
        data: D;
    }>;
}
export declare const createDetailLoader: (getFetchUrl: (id: string) => string) => ({ params }: LoaderFunctionArgs) => Promise<Response>;
export default function Detail<D>(props: DetailProps<D>): JSX.Element;
