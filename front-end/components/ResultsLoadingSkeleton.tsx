import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export default function ResultsLoadingSkeleton(props: JSX.IntrinsicAttributes & IContentLoaderProps) {
    const repetitions = 8

    return (
        <>
            {[...Array(repetitions)].map((e, i) => (
                <ContentLoader
                    speed={2}
                    width={900}
                    height={150}
                    viewBox="0 0 900 150"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    key={i}
                    {...props}
                >
                    <rect x="0" y="42" rx="5" ry="5" width="220" height="10" />
                    <rect x="0" y="64" rx="5" ry="5" width="293" height="14" />
                    <rect x="0" y="90" rx="5" ry="5" width="700" height="9" />
                    <rect x="0" y="107" rx="5" ry="5" width="700" height="9" />
                    <rect x="0" y="124" rx="5" ry="5" width="700" height="9" />
                </ContentLoader>
            ))}
        </>
    )
}