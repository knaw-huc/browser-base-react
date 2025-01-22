import React from 'react';
import Facet, {DefaultFacetParams} from './facet.js';
import useFreeTextFacet from '../hooks/useFreeTextFacet.js';

export default function FreeTextFacet({
                                          name = 'Text search',
                                          field = 'FREE_TEXT'
                                      }: DefaultFacetParams) {
    const [textField, setTextFacet, handleChange, handleKeyPress] = useFreeTextFacet(name, field);

    return (
        <Facet name={name}>
            <div className="hcFacetSearch">
                <input type="text" value={textField} placeholder="Press ENTER to search"
                       onChange={handleChange} onKeyUp={handleKeyPress}/>

                <button type="button" name="button" onClick={setTextFacet}>
                    Search
                </button>
            </div>
        </Facet>
    );
};
