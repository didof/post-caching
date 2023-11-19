import * as db from "./db.mjs";
import { getURL, getView, createETag, sleep } from "./utils.mjs";

export default async (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const tag = getURL(req).searchParams.get("tag");
  const posts = await db.GET(tag);

  let [html, errView] = await getView("posts");
  if (errView) {
    console.error(errView);
    res.writeHead(500).end("Internal Server Error");
    return;
  }

  html = html.replace("%TAG%", tag ?? "all");
  html = html.replace(
    "%POSTS%",
    posts.map((post) => `<li>${post.title}</li>`).join("\n")
  );

  await sleep(10000)

  const etag = createETag(html);
  res.setHeader("ETag", etag);
  const ifNoneMatch = new Headers(req.headers).get("If-None-Match");
  if (ifNoneMatch === etag) {
    res.writeHead(304).end();
    return;
  }

  res.writeHead(200).end(html);
};
