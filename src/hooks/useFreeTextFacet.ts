import {useState, FormEvent, KeyboardEvent} from 'react';
import useFacet from './useFacet.js';

type FreeTextFacet = [
    string,
    () => void,
    (e: FormEvent<HTMLInputElement>) => void,
    (e: KeyboardEvent<HTMLInputElement>) => void
];

export default function useFreeTextFacet(label: string = 'Free text', field: string = 'FREE_TEXT'): FreeTextFacet {
    const [hidden, setHidden, searchValues, setFacet] = useFacet(label, field);
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

    return [textField, setTextFacet, handleChange, handleKeyPress];
};
