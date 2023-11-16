import fs from "fs/promises";
import path from "path";

export function to(promise) {
  return promise.then((res) => [res, null]).catch((err) => [null, err]);
}

export async function getView(name) {
  const filepath = path.resolve(process.cwd(), "src", "views", name + ".html");
  return await to(fs.readFile(filepath, "utf-8"));
}

export async function getViewStats(name) {
  const filepath = path.resolve(process.cwd(), "src", "views", name + ".html");
  return await to(fs.stat(filepath));
}
