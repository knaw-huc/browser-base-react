import React, {useState, useEffect} from 'react';
import {IFacetValue, ISendCandidate} from '../misc/interfaces';

export default function ListFacet(props: { parentCallback: ISendCandidate, name: string, field: string, url: string, flex: boolean }) {
    const [data, setData] = useState<IFacetValue[]>([]);
    const [url, setUrl] = useState(props.url + '?name=' + props.field + '&amount=10');
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);
    const [hidden, setHidden] = useState(true);

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    function sendCandidate(value: string) {
        props.parentCallback({facet: props.name, field: props.field, candidate: value});
    }

    function changeListLength() {
        if (more) {
            setUrl(props.url + '?name=' + props.field + '&amount=500');
        }
        else {
            setUrl(props.url + '?name=' + props.field + '&amount=10');
        }
        setMore(!more);
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle" onClick={() => setHidden(!hidden)}>
                <span>{props.name}</span>
                <span className="hcIconHelp">
                    {hidden ? '+' : '-'}
                </span>
            </div>

            {!hidden &&
                <div className="hcFacetItems">
                    {!loading ? (<div>
                        {data.map((item, index) => (
                            <div key={index} className="hcFacetItem" onClick={() => sendCandidate(item.key)}>
                                <div className="checkBoxLabel"> {item.key} ({item.doc_count})</div>
                            </div>)
                        )}
                        {props.flex && (<div className="hcClickable" onClick={changeListLength}>
                            {more ? (<div>More...</div>) : (<div>Less...</div>)}
                        </div>)}
                    </div>) : (<div>Loading...</div>)}
                </div>
            }
        </div>
    );
}
