import React from 'react';
import {Link} from 'react-router-dom';

export interface HomeProps {
    title: string;
    description?: string;
    updateDocumentTitle?: boolean;
}

export default function Home({title, description, updateDocumentTitle = true}: HomeProps) {
    if (updateDocumentTitle) {
        document.title = title;
    }

    return (
        <div className="hcContentContainer">
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <Link to="search/">Browse</Link>
        </div>
    );
}
