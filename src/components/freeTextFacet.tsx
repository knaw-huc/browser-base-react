import React from 'react';
import Facet, {DefaultFacetParams} from './facet.js';
import useFreeTextFacet from '../hooks/useFreeTextFacet.js';
import {useTranslation} from "react-i18next";

export default function FreeTextFacet({
                                          registerFacet,
                                          unregisterFacet,
                                          setFacet,
                                          name = 'default_text',
                                          field = 'FREE_TEXT'
                                      }: DefaultFacetParams) {
    const [textField, setTextFacet, handleChange, handleKeyPress] =
        useFreeTextFacet(registerFacet, unregisterFacet, setFacet, name, field);

    const {t, i18n} = useTranslation()

    if (name == 'default_text') {
        name = t('browser-base:textSearch')
    }

    return (
        <Facet name={name}>
            <div className="hcFacetSearch">
                <input type="text" value={textField} placeholder={t('browser-base:textSearchExplained')}
                       onChange={handleChange} onKeyUp={handleKeyPress}/>

                <button type="button" name="button" onClick={setTextFacet}>
                    {t('browser-base:search')}
                </button>
            </div>
        </Facet>
    );
};
