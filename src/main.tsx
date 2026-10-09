import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

/**
 * Share/streamer links (?e=, ?d=, ?stream=, ?bg=) change what the wheel renders on the very first
 * client render, so they can never match the static HTML. Render those fresh instead of hydrating.
 */
const hasRenderAffectingParams = (() => {
  try {
    const params = new URLSearchParams(window.location.search);
    return ["e", "d", "stream", "bg"].some((key) => params.has(key));
  } catch {
    return false;
  }
})();

// Server-rendered pages (data-ssr) are hydrated; client-only shells (/embed, /result, 404, legacy stubs) render fresh.
if (rootEl.dataset.ssr === "true" && !hasRenderAffectingParams) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
