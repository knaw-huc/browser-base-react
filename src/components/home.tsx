import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

export interface HomeProps {
    title: string;
    description?: string;
    updateDocumentTitle?: boolean;
}

export default function Home({title, description, updateDocumentTitle = true}: HomeProps) {

    const {t} = useTranslation()

    if (updateDocumentTitle) {
        document.title = title;
    }

    return (
        <div className="hcContentContainer">
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <Link to="search/">{t('browser-base:browse')}</Link>
        </div>
    );
}
