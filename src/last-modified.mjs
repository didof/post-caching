import { getView, getViewStats } from "./utils.mjs";

export default async (req, res) => {
  res.setHeader("content-type", "text/html");

  const [stats, errStats] = await getViewStats("index");
  if (errStats) {
    console.error(errStats);
    res.writeHead(500).end("Internal Server Error");
    return;
  }

  const lastModified = new Date(stats.mtime);
  lastModified.setMilliseconds(0);
  res.setHeader("last-modified", lastModified.toUTCString());

  const ifModifiedSince = req.headers["if-modified-since"];
  if (
    ifModifiedSince &&
    new Date(ifModifiedSince).getTime() >= lastModified.getTime()
  ) {
    res.writeHead(304).end();
    return;
  }

  const [html, errGet] = await getView("index");
  if (errGet) {
    console.error(errGet);
    res.writeHead(500).end("Internal Server Error");
    return;
  }

  res.writeHead(200).end(html);
};
