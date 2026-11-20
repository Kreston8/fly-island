import assert from "node:assert/strict";
import test from "node:test";
import { CAPSULE_SHAPE_ENABLED, shapedSettings } from "../../src/features/appearance/islandShape.ts";
import { FLY_CAPSULE_TOP_GAP } from "../../src/features/appearance/flyCapsule.ts";
import { normalizeSettings, withAppearanceFrom } from "../../src/features/appearance/settings.ts";

const capsule = (fields = {}) => ({ ...normalizeSettings(null), islandShape: "capsule", ...fields });

test("saved settings without a shape keep the notch; a saved capsule only while it is offered", () => {
  assert.equal(normalizeSettings(null).islandShape, "notch");
  assert.equal(normalizeSettings({ islandShape: "pill" }).islandShape, "notch");
  assert.equal(normalizeSettings({ islandShape: "capsule" }).islandShape, CAPSULE_SHAPE_ENABLED ? "capsule" : "notch");
});

test("the notch draws the user's own settings", () => {
  const settings = normalizeSettings({ marginY: 0, collapsedCornerRadius: 12 });
  assert.equal(shapedSettings(settings), settings);
});

test("the capsule uses fly-capsule's top gap and four-corner radius", () => {
  const shaped = shapedSettings(capsule({ collapsedHeight: 44, capsuleCollapsedCornerRadius: 18 }));
  assert.equal(shaped.marginY, FLY_CAPSULE_TOP_GAP.default);
  assert.equal(shaped.collapsedCornerRadius, 18);
  assert.equal(shaped.islandCornerRadius, 18);
  assert.equal(shapedSettings(capsule({ collapsedHeight: 44, capsuleCollapsedCornerRadius: 30 })).collapsedCornerRadius, 22);
  assert.equal(shapedSettings(capsule({ marginY: 30 })).marginY, 30, "a larger saved margin is kept");
});

test("the shape travels with appearance presets", () => {
  assert.equal(withAppearanceFrom(normalizeSettings(null), capsule()).islandShape, "capsule");
});
