import type { IslandSettings } from "./types";
import { FLY_CAPSULE_TOP_GAP } from "./flyCapsule.ts";

/** Enables the app's native capsule geometry; the fly-capsule plugin exposes its controls. */
export const CAPSULE_SHAPE_ENABLED = true;

/**
 * The settings as the island draws them. The notch keeps the user's own values (and the same
 * object except that its unused margin is cleared). The capsule uses the fly-capsule top gap and
 * its selected radius in both states; the last radius is capped at half the collapsed height so
 * the native hit area and CSS corners agree.
 */
export function shapedSettings(settings: IslandSettings): IslandSettings {
  if (settings.islandShape !== "capsule") {
    return settings.marginY === 0 ? settings : { ...settings, marginY: 0 };
  }
  return {
    ...settings,
    marginY: Math.max(settings.marginY, FLY_CAPSULE_TOP_GAP.min),
    islandCornerRadius: settings.capsuleExpandedCornerRadius,
    collapsedCornerRadius: Math.min(
      settings.capsuleCollapsedCornerRadius,
      settings.collapsedHeight / 2,
    ),
  };
}
