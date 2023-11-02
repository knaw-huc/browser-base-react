import React, { FunctionComponent } from 'react';
export interface DetailProps<D> {
    title?: string;
    updateDocumentTitle?: boolean;
    DetailComponent: FunctionComponent<{
        data: D;
    }>;
}
export default function Detail<D>({ title, updateDocumentTitle, DetailComponent }: DetailProps<D>): React.JSX.Element;
