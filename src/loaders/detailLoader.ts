export default function createDetailLoader(getFetchUrl: (id: string) => string) {
    return async (id: string) => fetch(getFetchUrl(id));
}
