type DestructedQuery = {
    query: string,
    tags: string[] | null,
    wildcardUse: boolean,
    booleanUse: boolean,
    exactSearchUse: boolean,
    proximityUse: boolean,
    termWildcardUse: boolean
}

export function destructQuery(searchQuery: string): DestructedQuery {
    // This function is chaos, sorry
    const query = searchQuery
    var tags = searchQuery.match(/\s#(?!\d+\(\w+,\w+\))\S+|^#(?!\d+\(\w+,\w+\))\S+/g)

    const proximityRe = /#\d+\(\w+,\w+\)/g
    const proximityUse = proximityRe.test(searchQuery)

    const cleanQuery = searchQuery.replaceAll(/\s#\S+|^#\S+/g, '')
    const booleanUse = new RegExp(/\S+ AND +\S|\S+ OR +\S/g).test(cleanQuery)

    const potentialWildcards = cleanQuery.match(/\*\S+|\S+\*\S+|\S+\*/g)
    var wildcardUse
    // Check that none of them are tags
    if (!potentialWildcards) {
        wildcardUse = false
    } else {
        wildcardUse = !potentialWildcards!.every((e) => e.at(0) == '#')
    }

    const exactSearchUse = new RegExp(/\".+\"/g).test(cleanQuery)

    const termWildcardRe = new RegExp(/"\w+\s+\*\s+\w+"/g)
    const termWildcardUse = termWildcardRe.test(cleanQuery)


    return { query, tags, wildcardUse, booleanUse, exactSearchUse, proximityUse, termWildcardUse }
}

export function highlightOccurringWords(text: string, query: string) {
    const terms = query.split(/\s/g)

    terms.forEach((t) => {
        text = text.replaceAll(` ${t} `, ' **' + t + '** ')
        text = text.replaceAll(` ${t}.`, ' **' + t + '**.')
    })

    return text
}

export function extractTagsFromPath(path: string) {
    if (!path.indexOf('%20')) {
        return []
    } else {
        const queryTagProcessed = path.replaceAll('%20', ' ')
        const tags = queryTagProcessed.match(/\s#(?!\d+\(\w+,\w+\))\S+|^#(?!\d+\(\w+,\w+\))\S+/g)?.map((tag: string) => { return tag.trim().replace('#', '') })
        return tags ? tags : []
    }
}