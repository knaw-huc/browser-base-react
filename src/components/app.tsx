import React, {ReactElement} from 'react';
import {Outlet, ScrollRestoration} from 'react-router-dom';

export default function App({header, footer}: { header: ReactElement, footer?: ReactElement }) {
    return (
        <>
            {header}
            <ScrollRestoration/>
            <Outlet/>
            {footer}
        </>
    );
}
