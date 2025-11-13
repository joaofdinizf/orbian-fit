export type PlanDoneEntry = {
  workoutId: string;
  exerciseId: string;
  dateISO: string;          // yyyy-mm-dd
  prescribed?: { sets?: string; reps?: string; weight?: string };
  performed:   { sets?: string; reps?: string; weight?: string; rpe?: string; notes?: string };
};
