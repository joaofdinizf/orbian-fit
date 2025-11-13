export type FeatureFlag =
  | 'share_card'
  | 'plan_vs_done'
  | 'swap_exercise'
  | 'rest_timer'
  | 'session_timer'
  | 'progress_analytics'
  | 'time_estimator'
  | 'premade_workouts'
  | 'stretching'
  | 'session_summary'
  | 'add_only_hardening';

const defaults: Record<FeatureFlag, boolean> = {
  share_card: false,
  plan_vs_done: false,
  swap_exercise: false,
  rest_timer: false,
  session_timer: false,
  progress_analytics: false,
  time_estimator: false,
  premade_workouts: false,
  stretching: false,
  session_summary: false,
  add_only_hardening: false,
};

export function isEnabled(flag: FeatureFlag) {
  const env = process.env[`NEXT_PUBLIC_FLAG_${flag.toUpperCase()}`];
  if (env === 'true') return true;
  if (env === 'false') return false;
  return defaults[flag];
}
