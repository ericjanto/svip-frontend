type DestructedQuery = {
    query: string,
    tags: string[] | null,
    wildcardUse: boolean,
    booleanUse: boolean,
}

export function destructQuery(searchQuery: string): DestructedQuery {
    const query = searchQuery
    const tags = searchQuery.match(/\s#\S+/g)
    const booleanUse = new RegExp(/\S+ AND +\S|\S+ OR +\S/g).test(searchQuery)

    const potentialWildcards = searchQuery.match(/\*\S+|\S+\*|\S+\*\S+/g)

    var wildcardUse
    // Check that none of them are tags
    if (!potentialWildcards) {
        wildcardUse = false
    } else {
        wildcardUse = potentialWildcards!.every((e) => e.at(0) != '#')
    }

    return { query, tags, wildcardUse, booleanUse }
}