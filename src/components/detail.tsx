import React, {FunctionComponent} from 'react';
import {LoaderFunctionArgs, useLoaderData, useNavigation} from 'react-router-dom';

export interface DetailProps<D> {
    title: string;
    detailComponent: FunctionComponent<{ data: D }>;
}

export const createDetailLoader = (getFetchUrl: (id: string) => string) =>
    async ({params}: LoaderFunctionArgs) =>
        fetch(getFetchUrl(params.id as string));

export default function Detail<D>(props: DetailProps<D>) {
    const navigation = useNavigation();
    const data = useLoaderData() as D;

    document.title = `Item | ${props.title}`;

    if (navigation.state === 'loading') {
        return (
            <div className="hcContentContainer">
                <div>Loading</div>
            </div>
        );
    }

    return <props.detailComponent data={data}/>;
}
