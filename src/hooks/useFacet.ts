import {useEffect, useState} from 'react';
import useSearch, {FacetEvent} from './useSearch.js';
import {SearchValues} from '../context/SearchContext';

type Facet = [
    boolean,
    (hidden: boolean) => void,
    SearchValues[],
    FacetEvent
];

export default function useFacet(label: string, field: string, isHidden: boolean = true): Facet {
    const {registerFacet, unregisterFacet, searchValues, setFacet} = useSearch();
    const [hidden, setHidden] = useState(isHidden);

    useEffect(() => {
        registerFacet(field, label);
        return () => unregisterFacet(field);
    }, [field]);

    return [hidden, setHidden, searchValues, setFacet];
};
