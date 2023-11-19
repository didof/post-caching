import { createServer } from "http";
import * as endpoints from "./src/index.mjs";
import { getURL } from "./src/utils.mjs";

createServer(async (req, res) => {
  switch (getURL(req).pathname) {
    case "/no-headers":
      return await endpoints.noHeaders(req, res);
    case "/last-modified":
      return await endpoints.lastModified(req, res);
    case "/only-etag":
      return await endpoints.onlyETag(req, res);
    case "/db":
      return await endpoints.db(req, res);
  }
}).listen(8000, "127.0.0.1", () =>
  console.info("Exposed on http://127.0.0.1:8000")
);
