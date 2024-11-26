import React, {FunctionComponent} from 'react';
import {useLoaderData, useNavigation} from 'react-router-dom';
import {useTranslation} from "react-i18next";

export interface DetailProps<D> {
    title?: string;
    updateDocumentTitle?: boolean;
    DetailComponent: FunctionComponent<{ data: D }>;
}

export default function Detail<D>({title, updateDocumentTitle = true, DetailComponent}: DetailProps<D>) {
    const navigation = useNavigation();
    const data = useLoaderData() as D;
    const {t, i18n} = useTranslation();

    if (updateDocumentTitle) {
        document.title = title ? `Item | ${title}` : 'Item';
    }

    if (navigation.state === 'loading') {
        return (
            <div className="hcContentContainer">
                <div>{t('browser-base:loading')}</div>
            </div>
        );
    }

    return <DetailComponent data={data}/>;
}
