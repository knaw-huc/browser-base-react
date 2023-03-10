import React from 'react';
import {Link} from 'react-router-dom';
import {IMetadata, ISearchObject} from '../misc/interfaces';

export default function Collections(props: IMetadata) {
    document.title = props.title;

    function getSearchLink(facetValue: string) {
        let searchStruc: ISearchObject = {
            searchvalues: [{name: 'Collection', field: 'collection', values: [facetValue]}],
            page: 1,
            page_length: 30,
            sortorder: 'title'
        };
        if (facetValue == 'all') {
            searchStruc.searchvalues = [];
        }

        return 'search/' + window.btoa(JSON.stringify(searchStruc));
    }

    return (
        <div className="hcContentContainer">
            <h2>{props.title}</h2>
            <div>{props.description}</div>
            <Link to={getSearchLink('all')}>Browse</Link>
        </div>
    )
}
