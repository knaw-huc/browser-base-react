import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import './pageHeader.css';

export interface PageHeaderProps {
    title: string;
    logo?: ReactElement;
    items?: ReactElement;
}

export default function PageHeader({title, logo, items}: PageHeaderProps) {
    return (
        <>
            <div className="hcContentContainer pageHeader">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <Link className="hcBrand" to="/">
                        {logo && <div className="hcBrandLogo">
                            {logo}
                        </div>}

                        <div className="hcTitle">{title}</div>
                    </Link>

                    {items}
                </header>
            </div>
            <div className="hcContentContainer pageHeaderAfter"></div>
        </>
    )
}
