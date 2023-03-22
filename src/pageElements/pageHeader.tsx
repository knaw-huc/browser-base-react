import React from 'react';
import {Link} from 'react-router-dom';
import './pageHeader.css';

export default function PageHeader(props: { title: string }) {
    return (
        <>
            <div className="hcContentContainer pageHeader">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <Link to="/">
                            <div className="hcTitle">{props.title}</div>
                        </Link>
                    </div>
                </header>
            </div>
            <div className="hcContentContainer pageHeaderAfter"></div>
        </>
    )
}
