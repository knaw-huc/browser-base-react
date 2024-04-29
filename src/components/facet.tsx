import React, {ReactNode} from 'react';
import {FacetEvent, RegisterFacet, UnregisterFacet} from '../hooks/useSearch.js';

export interface FacetParams extends DefaultFacetParams {
    name: string;
    field: string;
}

export interface DefaultFacetParams {
    registerFacet: RegisterFacet;
    unregisterFacet: UnregisterFacet;
    setFacet: FacetEvent;
    name?: string;
    field?: string;
}

interface Params {
    name: string;
    hidden?: boolean;
    setHidden?: (hidden: boolean) => void;
    children: ReactNode
}

export default function Facet({name, hidden = false, setHidden, children}: Params) {
    return (
        <div className="hcFacet">
            <div className="hcFacetTitle" onClick={() => setHidden && setHidden(!hidden)}>
                <span>{name}</span>

                {setHidden && <span className="hcIconHelp">
                    {hidden ? '+' : '-'}
                </span>}
            </div>

            {!hidden && children}
        </div>
    );
}
