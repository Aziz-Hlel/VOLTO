export const appSettingsKeys = {
  LADIES_NIGHT_DRINK_QUOTA: 'LADIES_NIGHT_DRINK_QUOTA',
} as const;

export type IAppSettings = (typeof appSettingsKeys)[keyof typeof appSettingsKeys];

export const appSettingsDefaults: Record<IAppSettings, string> = {
  LADIES_NIGHT_DRINK_QUOTA: '3',
};
