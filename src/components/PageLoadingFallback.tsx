export const PageLoadingFallback = () => (
  <div
    className="min-h-[40vh] flex items-center justify-center px-4"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <p className="text-sm text-muted-foreground">Loading page…</p>
  </div>
);
