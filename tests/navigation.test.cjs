const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const vm = require("node:vm");
const source = fs.readFileSync(
  "components/journey/environment/navigation.ts",
  "utf8",
);
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(code, context);
const { spawn, bounds, isBlocked, obstacles } = context.exports;
// Flood-fill the actual player clearance grid, not merely installation centre distances.
const visited = new Set();
const queue = [[spawn[0], spawn[2]]];
visited.add(queue[0].join(","));
for (let i = 0; i < queue.length; i++) {
  const [x, z] = queue[i];
  for (const [dx, dz] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const next = [x + dx, z + dz],
      key = next.join(",");
    if (!visited.has(key) && !isBlocked(...next)) {
      visited.add(key);
      queue.push(next);
    }
  }
}
test("arrival is inside the hall and clear of solids", () =>
  assert.equal(isBlocked(spawn[0], spawn[2]), false));
for (const [name, point] of [
  ["education", [-20, -23]],
  ["campus rear", [-20, -38]],
  ["technology", [15, -16]],
  ["studio", [-22, 14]],
  ["interests", [23, 16]],
  ["climbing landing", [23, 6]],
]) {
  test(`${name} is reachable from arrival without crossing a collider`, () =>
    assert.ok(visited.has(point.join(","))));
}
test("physical wall bounds prevent leaving the continuous floor", () => {
  assert.ok(isBlocked(bounds.minX - 1, 0));
  assert.ok(isBlocked(bounds.maxX + 1, 0));
  assert.ok(isBlocked(0, bounds.minZ - 1));
  assert.ok(isBlocked(0, bounds.maxZ + 1));
});
test("every solid blocks its own centre", () => {
  for (const o of obstacles) assert.ok(isBlocked(o.x, o.z));
});
test("exhibit has an accessible interaction approach", () =>
  assert.ok(visited.has("15,-17")));
