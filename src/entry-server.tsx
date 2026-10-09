/// <reference types="node" />
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import { AppTree } from "./App";

/** Render one route to an HTML string (waits for lazy route chunks). */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    let failed = false;
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    sink.on("finish", () => {
      Helmet.renderStatic();
      if (!failed) resolve(html);
    });
    const { pipe, abort } = renderToPipeableStream(
      <AppTree Router={StaticRouter} routerProps={{ location: url }} />,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError(error) {
          failed = true;
          reject(error);
        },
        onError(error) {
          console.error(`[ssr] ${url}:`, error);
        },
      },
    );
    setTimeout(() => {
      failed = true;
      abort();
      reject(new Error(`SSR timeout for ${url}`));
    }, 30000);
  });
}
