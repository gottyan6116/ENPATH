import test from "node:test";
import assert from "node:assert/strict";
import { safeHttpsUrl } from "../src/lib/config";

test("an absent booking connection cannot become a live booking link", () => {
  assert.equal(safeHttpsUrl(undefined), null);
  assert.equal(safeHttpsUrl("  "), null);
});
test("rejects executable, insecure and credential-bearing booking destinations", () => {
  for (const value of [
    "javascript:alert(1)",
    "http://example.com",
    "//example.com",
    "https://user:password@example.com",
  ]) {
    assert.equal(safeHttpsUrl(value), null);
  }
});
test("preserves a valid booking provider path and query", () => {
  assert.equal(
    safeHttpsUrl(" https://booking.example.com/enpath?type=consultation "),
    "https://booking.example.com/enpath?type=consultation",
  );
});
