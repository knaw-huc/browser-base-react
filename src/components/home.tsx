import React from 'react';
import {Link} from 'react-router-dom';
import {IMetadata} from '../misc/interfaces';

export default function Home(props: IMetadata) {
    document.title = props.title;

    const searchLink = 'search/' + window.btoa(JSON.stringify({
        searchvalues: [],
        page: 1,
        page_length: 30,
        sortorder: 'title'
    }));

    return (
        <div className="hcContentContainer">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <Link to={searchLink}>Browse</Link>
        </div>
    )
}
