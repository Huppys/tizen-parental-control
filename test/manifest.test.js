import { test, expect } from "vitest";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

// TizenBrew ruft vor dem Start für jeden Eintrag registerKey() ohne try/catch auf.
// Diese Tasten liefert Tizen ohnehin an die App, sie gehören nicht in "keys".
const DELIVERED_BY_DEFAULT = ["Enter", "Back", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

test("keys lists no key that Tizen delivers without registration", () => {
  const keys = manifest.keys ?? [];
  expect(keys.filter((key) => DELIVERED_BY_DEFAULT.includes(key))).toEqual([]);
});
