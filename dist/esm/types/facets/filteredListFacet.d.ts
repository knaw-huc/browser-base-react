import React from "react";
import { ISendCandidate } from "../misc/interfaces";
declare function FilteredListFacet(props: {
    parentCallback: ISendCandidate;
    name: string;
    field: string;
    url: string;
}): React.JSX.Element;
export default FilteredListFacet;
