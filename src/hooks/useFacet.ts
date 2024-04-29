import {useEffect, useState} from 'react';
import {RegisterFacet, UnregisterFacet} from './useSearch.js';

type Facet = [boolean, (hidden: boolean) => void];

export default function useFacet(registerFacet: RegisterFacet, unregisterFacet: UnregisterFacet,
                                 label: string, field: string, isHidden: boolean = true): Facet {
    const [hidden, setHidden] = useState(isHidden);

    useEffect(() => {
        registerFacet(field, label);
        return () => unregisterFacet(field);
    }, [field]);

    return [hidden, setHidden];
};
