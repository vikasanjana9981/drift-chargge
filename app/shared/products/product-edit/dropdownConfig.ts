
export enum ConfigureSettings {
    MANAGE_PLANS = "manage_plans",
    // MANAGE_VARIANTS_PLANS = "manage_variants_plans",
}

// Labels for dropdown items
export const ConfigureSettingsLabels: Record<ConfigureSettings, string> = {
    [ConfigureSettings.MANAGE_PLANS]: "Manage Plans",
    // [ConfigureSettings.MANAGE_VARIANTS_PLANS]: "Manage Variant Plans",
};

// Dropdown options
export const ConfigureSettingsOptions = Object.values(ConfigureSettings).map((status) => ({
    value: status,
    label: ConfigureSettingsLabels[status],
}));

