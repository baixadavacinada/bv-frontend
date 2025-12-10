export default function PerguntasFrequentesLoading() {
  return (
    <div className="w-full space-y-8">
      {/* Header Skeleton */}
      <div className="h-10 w-1/3 animate-pulse rounded-lg bg-gray-200" />

      {/* Intro Skeleton */}
      <div className="animate-pulse rounded-lg bg-gray-100 p-6">
        <div className="h-20 rounded bg-gray-200" />
      </div>

      {/* FAQ Sections Skeleton */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <div className="h-8 w-1/4 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-lg border border-gray-200 p-4">
                <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
