'use client';

import type { PlanDoneEntry } from '@/types/workout';

const KEY = 'orbian_plan_vs_done_v1';

export function loadPlanDone(workoutId: string, dateISO: string): PlanDoneEntry[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  const all: PlanDoneEntry[] = raw ? JSON.parse(raw) : [];
  return all.filter(e => e.workoutId === workoutId && e.dateISO === dateISO);
}

export function upsertPlanDone(entry: PlanDoneEntry) {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(KEY);
  const all: PlanDoneEntry[] = raw ? JSON.parse(raw) : [];
  const idx = all.findIndex(e =>
    e.workoutId === entry.workoutId &&
    e.exerciseId === entry.exerciseId &&
    e.dateISO === entry.dateISO
  );
  if (idx >= 0) all[idx] = entry; else all.push(entry);
  localStorage.setItem(KEY, JSON.stringify(all));
}
