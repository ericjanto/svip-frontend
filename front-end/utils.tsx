type DestructedQuery = {
    query: string,
    tags: string[] | null,
    wildcardUse: boolean,
    booleanUse: boolean,
}

export function destructQuery(searchQuery: string): DestructedQuery {
    const query = searchQuery
    const tags = searchQuery.match(/#\w+/g)
    const wildcardUse = new RegExp(/\*\S|\S\*|\S\*\S/g).test(searchQuery)
    const booleanUse = new RegExp(/AND +.|OR +./g).test(searchQuery)
    return { query, tags, wildcardUse, booleanUse }
}