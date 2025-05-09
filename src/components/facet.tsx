import React, {ReactNode} from 'react';

export interface FacetParams extends DefaultFacetParams {
    name: string;
    field: string;
}

export interface DefaultFacetParams {
    name?: string;
    field?: string;
}

interface Params {
    name: string;
    hidden?: boolean;
    setHidden?: (hidden: boolean | ((hidden: boolean) => boolean)) => void;
    children: ReactNode
}

export default function Facet({name, hidden = false, setHidden, children}: Params) {
    return (
        <div className="hcFacet">
            <div className="hcFacetTitle" onClick={() => setHidden && setHidden(hidden => !hidden)}>
                <span>{name}</span>

                {setHidden && <span className="hcIconHelp">
                    {hidden ? '+' : '-'}
                </span>}
            </div>

            {!hidden && children}
        </div>
    );
}
