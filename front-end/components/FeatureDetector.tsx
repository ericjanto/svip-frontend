import { destructQuery } from "../utils"


type FeatureDetectorProps = {
    searchQuery: string
}

export default function FeatureDetector({ searchQuery }: FeatureDetectorProps) {
    const { query, tags, wildcardUse, booleanUse, exactSearchUse } = destructQuery(searchQuery)

    const tagUse = tags != null
    var usedFeatures = 0
    if (tagUse) usedFeatures++
    if (wildcardUse) usedFeatures++
    if (booleanUse) usedFeatures++
    if (exactSearchUse) usedFeatures++
    

    return (
        <details className="text-sm text-gray-500">
            <summary>Tip: Use advanced query syntax to refine your search ({usedFeatures}/4)</summary>
            <ul className="list-disc ml-8">
                <li className={tagUse ? "text-green-600" : ""}>
                    Filter results with story tags:
                    <code>
                        <span className="text-blue-500"> #</span>
                        &lt;tag&gt;
                    </code>
                </li>
                <li className={wildcardUse ? "text-green-600" : ""}>Use wildcard search:{' '}
                    <code>
                        direction of{' '}
                        <span className="text-blue-500">*</span>
                        east
                    </code>
                </li>
                <li className={booleanUse ? "text-green-600" : ""}>Use boolean search:{' '}
                    <code>
                        term1
                        <span className="text-blue-500"> AND </span>
                        term2
                        <span className="text-blue-500"> OR </span>
                        term3
                    </code>
                </li>
                <li className={exactSearchUse ? "text-green-600" : ""}>Use exact phrasal search:{' '}
                    <code>
                        <span className="text-blue-500">&quot;</span>
                        term1 term2
                        <span className="text-blue-500">&quot;</span>
                    </code>
                </li>
            </ul>
        </details>
    )
}