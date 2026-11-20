import assert from "node:assert/strict";
import test from "node:test";
import {
  FLY_CAPSULE_COLLAPSED_RADIUS,
  FLY_CAPSULE_EXPANDED_RADIUS,
  FLY_CAPSULE_TOP_GAP,
  setFlyCapsuleCollapsedRadius,
  setFlyCapsuleEnabled,
  setFlyCapsuleExpandedRadius,
  setFlyCapsuleTopGap,
} from "../../src/features/appearance/flyCapsule.ts";
import { normalizeInstalledNativePlugins } from "../../src/features/plugins/native/storage.ts";

function settings(overrides = {}) {
  return {
    islandShape: "notch",
    islandCornerRadius: 42,
    capsuleCollapsedCornerRadius: 18,
    capsuleExpandedCornerRadius: 18,
    marginY: 0,
    material: "classic",
    islandBackgroundColor: "#2F2F37",
    todoEnabled: true,
    autoCollapseSeconds: 30,
    ...overrides,
  };
}

test("fly-capsule only changes the requested island geometry", () => {
  const current = settings();
  const enabled = setFlyCapsuleEnabled(current, true);
  const positioned = setFlyCapsuleTopGap(enabled, 12);
  const collapsed = setFlyCapsuleCollapsedRadius(positioned, 22);
  const rounded = setFlyCapsuleExpandedRadius(collapsed, 30);

  assert.equal(rounded.islandShape, "capsule");
  assert.equal(rounded.marginY, 12);
  assert.equal(rounded.capsuleCollapsedCornerRadius, 22);
  assert.equal(rounded.capsuleExpandedCornerRadius, 30);
  assert.equal(rounded.islandCornerRadius, 42);
  assert.equal(rounded.material, current.material);
  assert.equal(rounded.islandBackgroundColor, current.islandBackgroundColor);
  assert.equal(rounded.todoEnabled, true);
  assert.equal(rounded.autoCollapseSeconds, 30);
});

test("fly-capsule turns the island back into the original notch shape", () => {
  const capsule = settings({ islandShape: "capsule", marginY: 20 });
  const notch = setFlyCapsuleEnabled(capsule, false);
  assert.equal(notch.islandShape, "notch");
  assert.equal(notch.marginY, 20);
});

test("top gap defaults to zero and is kept within the native bounds", () => {
  assert.equal(FLY_CAPSULE_TOP_GAP.default, 0);
  assert.equal(setFlyCapsuleTopGap(settings(), -10).marginY, 0);
  assert.equal(setFlyCapsuleTopGap(settings(), 999).marginY, 160);
});

test("both radius sliders share the same default and respect their own bounds", () => {
  assert.equal(
    FLY_CAPSULE_COLLAPSED_RADIUS.default,
    FLY_CAPSULE_EXPANDED_RADIUS.default,
  );
  assert.equal(setFlyCapsuleCollapsedRadius(settings(), -1).capsuleCollapsedCornerRadius, 0);
  assert.equal(setFlyCapsuleCollapsedRadius(settings(), 999).capsuleCollapsedCornerRadius, 40);
  assert.equal(setFlyCapsuleExpandedRadius(settings(), 0).capsuleExpandedCornerRadius, 8);
  assert.equal(setFlyCapsuleExpandedRadius(settings(), 999).capsuleExpandedCornerRadius, 96);
});

test("native plugin storage only enables fly-capsule after installation", () => {
  assert.equal(normalizeInstalledNativePlugins([]).flyCapsule, false);
  assert.equal(
    normalizeInstalledNativePlugins(["flyCapsule"]).flyCapsule,
    true,
  );
});
