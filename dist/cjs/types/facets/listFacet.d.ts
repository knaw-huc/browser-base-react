/// <reference types="react" />
import { ISendCandidate } from '../misc/interfaces';
export default function ListFacet(props: {
    parentCallback: ISendCandidate;
    name: string;
    field: string;
    url: string;
}): JSX.Element;
