import React from 'react';
import useFreeTextFacet from '../hooks/useFreeTextFacet.js';
import {FacetEvent, RegisterFacet, UnregisterFacet} from '../hooks/useSearch.js';

interface FreeTextProps {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    name?: string;
    field?: string;
}

export default function FreeTextFacet({
                                          registerFacet,
                                          unregisterFacet,
                                          setFacet,
                                          name = 'Text search',
                                          field
                                      }: FreeTextProps) {
    const [textField, setTextFacet, handleChange, handleKeyPress] =
        useFreeTextFacet(registerFacet, unregisterFacet, setFacet, name, field);

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                {name}
            </div>

            <div className="hcFacetSearch">
                <input type="text" value={textField} placeholder="Press ENTER to search"
                       onChange={handleChange} onKeyUp={handleKeyPress}/>

                <button type="button" name="button" onClick={setTextFacet}>
                    Search
                </button>
            </div>
        </div>
    )
};
