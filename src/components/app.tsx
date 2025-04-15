import React, {ReactNode, ReactElement} from 'react';

export default function App({header, footer, children}: {
    header: ReactElement,
    footer?: ReactElement,
    children: ReactNode
}) {
    return (
        <>
            {header}
            {children}
            {footer}
        </>
    );
}
