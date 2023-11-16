import { createServer } from "http";
import * as endpoints from "./src/index.mjs";

createServer((req, res) => {
  switch (req.url) {
    case "/no-headers":
      return endpoints.noHeaders(req, res);
    case "/last-modified":
      return endpoints.lastModified(req, res);
  }
}).listen(8000, "127.0.0.1", () =>
  console.info("Exposed on http://127.0.0.1:8000")
);
