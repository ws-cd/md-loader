import path from "node:path";
import fs from "node:fs/promises";
import { describe, test } from "bun:test";
import { loadByString } from "../src/index";

describe("Test", () => {
  test("base", async () => {
    const content = (
      await fs.readFile(path.resolve(process.cwd(), "test", "test.md"))
    ).toString("utf-8");
    const { value, ...rest } = await loadByString(content);
    console.log(rest);
    console.log("------------");
    console.log(value);
  });
});
