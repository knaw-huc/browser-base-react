import React from 'react';
import {Root, Track, Range, Thumb} from '@radix-ui/react-slider';
import Facet, {FacetParams} from './facet.js';
import useSliderFacet from '../hooks/useSliderFacet.js';
import './sliderFacet.css';

interface SliderFacetParams extends FacetParams {
    min: number;
    max: number;
    isHidden?: boolean;
}

export default function SliderFacet({
                                        name,
                                        field,
                                        min,
                                        max,
                                        isHidden = true
                                    }: SliderFacetParams) {
    const [from, to, hidden, setHidden, handleChange, sendSelect] =
        useSliderFacet(name, field, min, max, isHidden);

    return (
        <Facet name={name} hidden={hidden} setHidden={setHidden}>
            <Root
                className="sliderRoot"
                name={name}
                defaultValue={[min, max]}
                min={min}
                max={max}
                step={1}
                onValueChange={v => handleChange(v[0], v[1])}>
                <Track className="sliderTrack">
                    <Range className="sliderRange"/>
                </Track>

                <Thumb className="sliderThumb"/>
                <Thumb className="sliderThumb"/>
            </Root>

            <div className="sliderSelect">
                <button className="sliderSelectBtn" onClick={sendSelect}>Select</button>
                [{from} - {to}]
            </div>
        </Facet>
    );
}
