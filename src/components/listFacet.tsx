import React from 'react';
import Facet, {FacetParams} from './facet.js';
import useListFacet from '../hooks/useListFacet.js';

interface ListFacetParams extends FacetParams {
    url: string;
    usePost?: boolean;
    flex?: boolean;
    addFilter?: boolean;
    isHidden?: boolean;
}

export default function ListFacet({
                                      name,
                                      field,
                                      url,
                                      usePost = false,
                                      flex = true,
                                      addFilter = false,
                                      isHidden = true
                                  }: ListFacetParams) {
    const [
        data, loading, hidden, setHidden,
        more, changeListLength, sendCandidate, handleChange
    ] = useListFacet(name, field, url, usePost, isHidden);

    return (
        <Facet name={name} hidden={hidden} setHidden={setHidden}>
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
        </Facet>
    );
}
