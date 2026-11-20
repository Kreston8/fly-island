import { SettingsGroup } from "../../components/settings/SettingsGroup";
import { SettingsNumberRow } from "../../components/settings/SettingsNumberRow";
import { SettingsSliderRow } from "../../components/settings/SettingsSliderRow";
import { SettingsToggleRow } from "../../components/settings/SettingsToggleRow";
import { useTranslation } from "../../i18n";
import {
  FLY_CAPSULE_TOP_GAP,
  FLY_CAPSULE_COLLAPSED_RADIUS,
  FLY_CAPSULE_EXPANDED_RADIUS,
  setFlyCapsuleCollapsedRadius,
  setFlyCapsuleEnabled,
  setFlyCapsuleExpandedRadius,
  setFlyCapsuleTopGap,
} from "./flyCapsule";
import type { IslandSettings } from "./types";

/** Appearance → the optional fly-capsule geometry controls. */
export function FlyCapsuleSection({
  settings,
  onSettingsChange,
}: {
  settings: IslandSettings;
  onSettingsChange: (settings: IslandSettings) => void;
}) {
  const t = useTranslation();
  const text = t.settings.appearance.flyCapsule;
  return (
    <SettingsGroup title={text.title}>
      <SettingsToggleRow
        title={text.shape}
        description={text.shapeHint}
        checked={settings.islandShape === "capsule"}
        onChange={(enabled) =>
          onSettingsChange(setFlyCapsuleEnabled(settings, enabled))}
      />
      <SettingsNumberRow
        title={text.topGap}
        description={text.topGapHint}
        value={settings.marginY}
        min={FLY_CAPSULE_TOP_GAP.min}
        max={FLY_CAPSULE_TOP_GAP.max}
        step={FLY_CAPSULE_TOP_GAP.step}
        unit="px"
        onChange={(value) =>
          onSettingsChange(setFlyCapsuleTopGap(settings, value))}
      />
      <SettingsSliderRow
        title={text.cornerRadius}
        description={text.cornerRadiusHint}
        value={settings.capsuleCollapsedCornerRadius}
        min={FLY_CAPSULE_COLLAPSED_RADIUS.min}
        max={FLY_CAPSULE_COLLAPSED_RADIUS.max}
        step={FLY_CAPSULE_COLLAPSED_RADIUS.step}
        format={(value) => `${value}px`}
        defaultValue={FLY_CAPSULE_COLLAPSED_RADIUS.default}
        resetLabel={t.settings.layout.resetToDefault}
        onChange={(value) =>
          onSettingsChange(setFlyCapsuleCollapsedRadius(settings, value))}
      />
      <SettingsSliderRow
        title={text.expandedCornerRadius}
        description={text.expandedCornerRadiusHint}
        value={settings.capsuleExpandedCornerRadius}
        min={FLY_CAPSULE_EXPANDED_RADIUS.min}
        max={FLY_CAPSULE_EXPANDED_RADIUS.max}
        step={FLY_CAPSULE_EXPANDED_RADIUS.step}
        format={(value) => `${value}px`}
        defaultValue={FLY_CAPSULE_EXPANDED_RADIUS.default}
        resetLabel={t.settings.layout.resetToDefault}
        onChange={(value) =>
          onSettingsChange(setFlyCapsuleExpandedRadius(settings, value))}
      />
    </SettingsGroup>
  );
}
