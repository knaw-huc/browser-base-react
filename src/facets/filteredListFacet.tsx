import React, {useState, useEffect} from "react";
import {IFacetValue, ISendCandidate} from "../misc/interfaces";

export default function FilteredListFacet(props: { parentCallback: ISendCandidate, name: string, field: string, url: string }) {
    const [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<IFacetValue[]>([]);
    const [url, setUrl] = useState(props.url + "?name=" + props.field + "&amount=10&filter=");
    const [loading, setLoading] = useState(true);
    const [hidden, setHidden] = useState(true);
    const [refresh, setRefresh] = useState(true);


    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }



    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.value.length > 1)
        {
            setUrl(props.url + "?name=" + props.field + "&amount=10&filter=" + e.currentTarget.value);
        }
    }

    function sendCandidate(value: string) {
        props.parentCallback({facet: props.name, field: props.field, candidate: value});
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
            {!hidden && <div>
            <div className="hcFacetFilter"><input type="text" name="place" onChange={handleChange} id="place" placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.map((item, index) => {
                        return (<div key={index} className="hcFacetItem"  onClick={() => {sendCandidate(item.key)}}><div className="checkBoxLabel"> {item.key} ({item.doc_count})</div></div>);
                    })}

                </div>) :
                (<div className="hcFacetLoading">Loading...</div>)}
            </div>}
        </div>
    );
}
