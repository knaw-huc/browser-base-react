export default function createDetailLoader(getFetchUrl: (id: string) => string): (id: string) => Promise<Response>;
