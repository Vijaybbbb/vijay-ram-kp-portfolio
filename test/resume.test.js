import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import resume from "../api/resume.js";

const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
assert.match(html, /href="\/resume"/);
const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
assert.deepEqual(config.rewrites, [{ source: "/resume", destination: "/api/resume" }]);

const originalFetch = globalThis.fetch;
try {
  globalThis.fetch = async () => new Response('<tr data-id="newResume123"><td data-tooltip="Vijay-Resume.pdf PDF"></td></tr>');
  const resolved = await resume.fetch(new Request("https://example.com/resume"));
  assert.equal(resolved.status, 302);
  assert.equal(resolved.headers.get("location"), "https://drive.google.com/file/d/newResume123/view?usp=sharing");
  assert.equal(resolved.headers.get("cache-control"), "no-store");

  globalThis.fetch = async () => new Response('<tr data-id="one"><td data-tooltip="One.pdf PDF"></td></tr><tr data-id="two"><td data-tooltip="Two.pdf PDF"></td></tr>');
  const ambiguous = await resume.fetch(new Request("https://example.com/resume"));
  assert.equal(ambiguous.headers.get("location"), "https://drive.google.com/drive/folders/13xxXaP-VbX_ijKsgMNWS1vOK9xOD027I");
} finally {
  globalThis.fetch = originalFetch;
}

console.log("Vercel résumé route validated");
