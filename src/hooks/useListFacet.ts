import {useEffect, useState, FormEvent} from 'react';
import useFacet from './useFacet.js';
import {SearchValues} from '../context/SearchContext';

export interface FacetValue {
    key: string,
    doc_count: number
}

export interface FacetsRequestParams {
    name: string;
    amount: number;
    filter: string;
    searchvalues: SearchValues[];
}

type ListFacet = [
    FacetValue[],
    boolean,
    boolean,
    (hidden: boolean | ((hidden: boolean) => boolean)) => void,
    boolean,
    () => void,
    (value: string) => void,
    (e: FormEvent<HTMLInputElement>) => void
];

export default function useListFacet(label: string, field: string, url: string,
                                     usePost: boolean = false, isHidden = true,
                                     facetsRequest?: ((params: FacetsRequestParams) => Promise<FacetValue[]>),
                                     startAmount: number = 10, moreAmount: number = 500): ListFacet {
    const [hidden, setHidden, searchValues, setFacet] = useFacet(label, field, isHidden);
    const [data, setData] = useState<FacetValue[]>([]);
    const [filter, setFilter] = useState('');
    const [amount, setAmount] = useState(10);
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);

    const doGet = async () => fetch(`${url}?name=${field}&amount=${amount}&filter=${filter}`);
    const doPost = async () => fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: field,
            amount: amount,
            filter: filter,
            searchvalues: searchValues
        })
    });

    async function fetchData() {
        setLoading(true);

        if (facetsRequest) {
            const response = await facetsRequest({
                name: field,
                amount: amount,
                filter: filter,
                searchvalues: searchValues
            });
            setData(response);
        }
        else {
            const response = await (usePost ? doPost() : doGet());
            const json = await response.json();
            setData(json);
        }

        setLoading(false);
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        setFilter(e.currentTarget.value);
    }

    function sendCandidate(value: string) {
        setFacet(field, value);
    }

    function changeListLength() {
        setMore(!more);
        setAmount(more ? moreAmount : startAmount);
    }

    useEffect(() => {
        fetchData();
    }, [field, amount, filter, searchValues]);

    return [data, loading, hidden, setHidden, more, changeListLength, sendCandidate, handleChange];
};
