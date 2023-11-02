import React from 'react';
export interface HomeProps {
    title: string;
    description?: string;
    updateDocumentTitle?: boolean;
}
export default function Home({ title, description, updateDocumentTitle }: HomeProps): React.JSX.Element;
