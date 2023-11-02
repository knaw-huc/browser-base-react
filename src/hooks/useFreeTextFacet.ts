import React, {useEffect, useState} from 'react';
import {FacetEvent, RegisterFacet, UnregisterFacet} from './useSearch.js';

type FreeTextFacet = [
    string,
    () => void,
    (e: React.FormEvent<HTMLInputElement>) => void,
    (e: React.KeyboardEvent<HTMLInputElement>) => void
];

export default function useFreeTextFacet(registerFacet: RegisterFacet, unregisterFacet: UnregisterFacet,
                                         setFacet: FacetEvent,
                                         label: string = 'Free text', field: string = 'FREE_TEXT'): FreeTextFacet {
    const [textField, setTextField] = useState('');

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        setTextField(e.currentTarget.value);
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            setTextFacet();
        }
    }

    function setTextFacet() {
        if (textField !== '') {
            setFacet(field, textField);
            setTextField('');
        }
    }

    useEffect(() => {
        registerFacet(field, label);
        return () => unregisterFacet(field);
    }, [field]);

    return [textField, setTextFacet, handleChange, handleKeyPress];
};
