export function getPages(noPages: number, startPage: number = 1): number[] {
    return Array.from({length: noPages}, (_, i) => i + startPage);
}

export function getPrevPages(curPage: number, maxPages: number = 4): number[] {
    const minPage = curPage - maxPages > 0 ? maxPages : curPage - 1;
    return getPages(minPage, curPage - minPage);
}

export function getNextPages(curPage: number, totalPages: number, maxPages: number = 4): number[] {
    const maxPage = curPage + maxPages < totalPages ? maxPages : totalPages - curPage;
    return getPages(maxPage, curPage + 1);
}
