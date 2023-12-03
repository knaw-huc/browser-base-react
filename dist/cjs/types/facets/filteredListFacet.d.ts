import React from "react";
import { ISendCandidate } from "../misc/interfaces";
export default function FilteredListFacet(props: {
    parentCallback: ISendCandidate;
    name: string;
    field: string;
    url: string;
}): React.JSX.Element;
