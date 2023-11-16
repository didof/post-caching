import { createServer } from "http";
import noHeaders from "./src/noHeaders.mjs";

createServer((req, res) => {
  switch (req.url) {
    case "/":
      return noHeaders(req, res);
  }
}).listen(8000, "127.0.0.1", () =>
  console.info("Exposed on http://127.0.0.1:8000")
);
