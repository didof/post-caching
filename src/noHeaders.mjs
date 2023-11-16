import { getView } from "./utils.mjs";

export default async (req, res) => {
  const [html, err] = await getView("index");
  if (err) {
    console.error(err);
    res.writeHead(500).end("Internal Server Error");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" }).end(html);
};
