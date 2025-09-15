/**
 * Feature flag utilities
 * Environment variables control feature flags with fallback defaults
 */

interface FeatureFlags {
  ppvFlashback: boolean;
  enhancedOnThisDay: boolean;
}

export function getFeatureFlags(): FeatureFlags {
  return {
    ppvFlashback: process.env.FEATURES_PPV_FLASHBACK !== 'false', // default true
    enhancedOnThisDay: process.env.FEATURES_ENHANCED_ON_THIS_DAY !== 'false', // default true
  };
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[feature] ?? false;
}
