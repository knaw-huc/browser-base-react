import React from 'react';
import {Link} from 'react-router-dom';

export default function PageHeader(props: { title: string }) {
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <Link to="/">
                                <div className="hcTitle">{props.title}</div>
                            </Link>
                        </div>
                    </div>
                </header>
            </div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">

            </div>
        </div>
    )
}
