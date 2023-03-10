type DestructedQuery = {
    query: string,
    tags: string[] | null,
    wildcardUse: boolean,
    booleanUse: boolean,
    exactSearchUse: boolean
}

export function destructQuery(searchQuery: string): DestructedQuery {
    const query = searchQuery
    const tags = searchQuery.match(/\s#\S+|^#\S+/g)

    const cleanQuery = searchQuery.replaceAll(/\s#\S+|^#\S+/g, '')
    const booleanUse = new RegExp(/\S+ AND +\S|\S+ OR +\S/g).test(cleanQuery)

    const potentialWildcards = cleanQuery.match(/\*\S+|\S+\*\S+|\S+\*|\w+\s+\*\s+\w+/g)
    var wildcardUse
    // Check that none of them are tags
    if (!potentialWildcards) {
        wildcardUse = false
    } else {
        wildcardUse = !potentialWildcards!.every((e) => e.at(0) == '#')
    }

    const exactSearchUse = new RegExp(/\".+\"/g).test(cleanQuery)

    return { query, tags, wildcardUse, booleanUse, exactSearchUse }
}

export function highlightOccurringWords(text: string, query: string) {
    const terms = query.split(/\s/g)
    terms.forEach((t) => {
        text = text.replaceAll(t, ' **' + t + '**')
    })

    return text
}