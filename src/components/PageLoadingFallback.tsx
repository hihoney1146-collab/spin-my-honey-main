/** Invisible layout placeholder while lazy routes load — avoids visible "Loading…" flash. */
export const PageLoadingFallback = () => (
  <div className="min-h-[40vh]" role="status" aria-label="Loading" aria-busy="true" />
);
