export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    webkitAudioContext?: typeof AudioContext;
  }
}
