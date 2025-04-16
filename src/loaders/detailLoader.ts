export default function createDetailLoader(getFetchUrl: (id: string) => string) {
    return async (id: string, additionalHeaders?: { [key: string]: string }) =>
        fetch(getFetchUrl(id), {headers: additionalHeaders});
}
