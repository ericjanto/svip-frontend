import { destructQuery } from "../utils"


type FeatureDetectorProps = {
    searchQuery: string
}

export default function FeatureDetector({ searchQuery }: FeatureDetectorProps) {
    const { query, tags, wildcardUse, booleanUse } = destructQuery(searchQuery)

    return (
        <details className="text-sm text-gray-500">
            <summary>Advanced query explainer (wip)</summary>
            <ul className="list-disc ml-8">
                <li>Tags use: <code>{String(tags != null)}</code></li>
                <li>Wildcard use: <code>{String(wildcardUse)}</code></li>
                <li>Boolean use: <code>{String(booleanUse)}</code></li>
            </ul>
        </details>
    )
}