import React from 'react';
import useListFacet from '../hooks/useListFacet.js';
import {FacetEvent, RegisterFacet, SearchValues, UnregisterFacet} from '../hooks/useSearch.js';

interface ListFacetParams {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    name: string;
    field: string;
    url: string;
    searchValues: SearchValues[];
    usePost?: boolean;
    flex?: boolean;
    addFilter?: boolean;
}

export default function ListFacet({
                                      registerFacet,
                                      unregisterFacet,
                                      setFacet,
                                      name,
                                      field,
                                      url,
                                      searchValues,
                                      usePost = false,
                                      flex = true,
                                      addFilter = false
                                  }: ListFacetParams) {
    const [
        data, loading, hidden, setHidden,
        more, changeListLength, sendCandidate, handleChange
    ] = useListFacet(name, field, url, registerFacet, unregisterFacet, setFacet, searchValues, usePost);

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle" onClick={() => setHidden(!hidden)}>
                <span>{name}</span>

                <span className="hcIconHelp">
                    {hidden ? '+' : '-'}
                </span>
            </div>

            {!hidden && <>
                {addFilter && <div className="hcFacetFilter">
                    <input type="text" placeholder="Type to filter" onChange={handleChange}/>
                </div>}

                <div className="hcFacetItems">
                    {!loading ? (<div>
                        {data.map((item, index) => (
                            <div key={index} className="hcFacetItem" onClick={() => sendCandidate(item.key)}>
                                <div className="checkBoxLabel"> {item.key} ({item.doc_count})</div>
                            </div>)
                        )}

                        {flex && (<div className="hcClickable" onClick={changeListLength}>
                            {more ? (<div>More...</div>) : (<div>Less...</div>)}
                        </div>)}
                    </div>) : (<div>Loading...</div>)}
                </div>
            </>}
        </div>
    );
}
