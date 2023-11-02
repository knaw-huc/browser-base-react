import React, {FunctionComponent} from 'react';
import {useLoaderData, useNavigation} from 'react-router-dom';

export interface DetailProps<D> {
    title?: string;
    updateDocumentTitle?: boolean;
    DetailComponent: FunctionComponent<{ data: D }>;
}

export default function Detail<D>({title, updateDocumentTitle = true, DetailComponent}: DetailProps<D>) {
    const navigation = useNavigation();
    const data = useLoaderData() as D;

    if (updateDocumentTitle) {
        document.title = title ? `Item | ${title}` : 'Item';
    }

    if (navigation.state === 'loading') {
        return (
            <div className="hcContentContainer">
                <div>Loading</div>
            </div>
        );
    }

    return <DetailComponent data={data}/>;
}
