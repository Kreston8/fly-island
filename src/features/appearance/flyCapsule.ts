import { clamp } from "../../utils/number.ts";
import { ISLAND_CORNER_RADIUS } from "./settingsLimits.ts";
import type { IslandSettings } from "./types";

/** The native island accepts this as its vertical work-area margin. */
export const FLY_CAPSULE_TOP_GAP = {
  min: 0,
  max: 160,
  step: 1,
  default: 0,
} as const;

/** The collapsed and expanded capsule sliders share their first value. */
export const FLY_CAPSULE_COLLAPSED_RADIUS = {
  min: 0,
  max: 40,
  step: 1,
  default: 18,
} as const;

export const FLY_CAPSULE_EXPANDED_RADIUS = {
  min: ISLAND_CORNER_RADIUS.min,
  max: ISLAND_CORNER_RADIUS.max,
  step: 1,
  default: FLY_CAPSULE_COLLAPSED_RADIUS.default,
} as const;

export function setFlyCapsuleEnabled(
  settings: IslandSettings,
  enabled: boolean,
): IslandSettings {
  return {
    ...settings,
    islandShape: enabled ? "capsule" : "notch",
  };
}

export function setFlyCapsuleTopGap(
  settings: IslandSettings,
  value: number,
): IslandSettings {
  return {
    ...settings,
    marginY: clamp(
      Math.round(value),
      FLY_CAPSULE_TOP_GAP.min,
      FLY_CAPSULE_TOP_GAP.max,
    ),
  };
}

export function setFlyCapsuleCollapsedRadius(
  settings: IslandSettings,
  value: number,
): IslandSettings {
  return {
    ...settings,
    capsuleCollapsedCornerRadius: clamp(
      Math.round(value),
      FLY_CAPSULE_COLLAPSED_RADIUS.min,
      FLY_CAPSULE_COLLAPSED_RADIUS.max,
    ),
  };
}

export function setFlyCapsuleExpandedRadius(
  settings: IslandSettings,
  value: number,
): IslandSettings {
  return {
    ...settings,
    capsuleExpandedCornerRadius: clamp(
      Math.round(value),
      FLY_CAPSULE_EXPANDED_RADIUS.min,
      FLY_CAPSULE_EXPANDED_RADIUS.max,
    ),
  };
}
