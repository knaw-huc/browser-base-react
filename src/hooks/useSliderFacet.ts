import {useState} from 'react';
import useFacet from './useFacet.js';

type SliderFacet = [
    number,
    number,
    boolean,
    (hidden: boolean) => void,
    (from: number, to: number) => void,
    () => void
];

export default function useSliderFacet(label: string, field: string, min: number, max: number, isHidden = true): SliderFacet {
    const [hidden, setHidden, searchValues, setFacet] = useFacet(label, field, isHidden);
    const [[from, to], setRange] = useState<[from: number, to: number]>([min, max]);

    function handleChange(from: number, to: number) {
        setRange([from, to]);
    }

    function sendSelect() {
        setFacet(field, from + '-' + to, true);
    }

    return [from, to, hidden, setHidden, handleChange, sendSelect];
};
