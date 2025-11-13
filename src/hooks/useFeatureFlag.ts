'use client';
import { isEnabled } from '@/lib/featureFlags';

export function useFeatureFlag(flag: Parameters<typeof isEnabled>[0]) {
  return isEnabled(flag);
}
