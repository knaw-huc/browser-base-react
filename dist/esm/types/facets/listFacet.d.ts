import React from 'react';
import { ISendCandidate } from '../misc/interfaces';
export default function ListFacet(props: {
    parentCallback: ISendCandidate;
    name: string;
    field: string;
    url: string;
}): React.JSX.Element;
