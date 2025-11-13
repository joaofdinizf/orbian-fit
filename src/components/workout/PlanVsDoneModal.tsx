'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, CheckCircle } from 'lucide-react';
import { upsertPlanDone } from '@/lib/planDoneStore';
import type { PlanDoneEntry } from '@/types/workout';

type Props = {
  open: boolean;
  onClose: () => void;
  workoutId: string;
  dateISO: string;
  exercise: { id: string; name: string; prescribed?: { sets?: string; reps?: string; weight?: string } };
};

export default function PlanVsDoneModal({ open, onClose, workoutId, dateISO, exercise }: Props) {
  const [performedSets, setPerformedSets]   = useState('');
  const [performedReps, setPerformedReps]   = useState('');
  const [performedWeight, setPerformedWeight] = useState('');
  const [rpe, setRpe] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!open) return;
    setPerformedSets(''); setPerformedReps(''); setPerformedWeight(''); setRpe(''); setNotes('');
  }, [open]);

  if (!open) return null;

  const save = () => {
    const entry: PlanDoneEntry = {
      workoutId,
      exerciseId: exercise.id,
      dateISO,
      prescribed: exercise.prescribed,
      performed: { sets: performedSets, reps: performedReps, weight: performedWeight, rpe, notes },
    };
    upsertPlanDone(entry);
    onClose();
  };

  const diff = (p?: string, d?: string) => {
    if (!p || !d) return '';
    const pn = Number(String(p).replace(',', '.'));
    const dn = Number(String(d).replace(',', '.'));
    if (Number.isFinite(pn) && Number.isFinite(dn)) {
      const delta = dn - pn;
      if (delta === 0) return '=';
      return delta > 0 ? `+${delta}` : `${delta}`;
    }
    return '';
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white border-2 border-[#E6C85C] rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-[#0A0A0A]">
            Registrar execução — {exercise.name}
          </CardTitle>
          <Button onClick={onClose} variant="ghost" className="rounded-full p-2">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Prescrito (somente leitura, se existir) */}
          {exercise.prescribed && (
            <div className="grid grid-cols-3 gap-3 bg-[#FFF3C4] p-3 rounded-xl text-sm">
              <div>
                <div className="text-[#4A4A4A]">Séries (prescrito)</div>
                <div className="font-semibold">{exercise.prescribed.sets ?? '-'}</div>
              </div>
              <div>
                <div className="text-[#4A4A4A]">Reps (prescrito)</div>
                <div className="font-semibold">{exercise.prescribed.reps ?? '-'}</div>
              </div>
              <div>
                <div className="text-[#4A4A4A]">Carga (prescr.)</div>
                <div className="font-semibold">{exercise.prescribed.weight ?? '-'}</div>
              </div>
            </div>
          )}

          {/* Realizado */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-[#0A0A0A]">Séries (real)</Label>
              <Input value={performedSets} onChange={e=>setPerformedSets(e.target.value)} className="border-2 border-[#E6C85C] rounded-xl" />
              <p className="text-xs text-[#4A4A4A] mt-1">{diff(exercise.prescribed?.sets, performedSets)}</p>
            </div>
            <div>
              <Label className="text-[#0A0A0A]">Reps (real)</Label>
              <Input value={performedReps} onChange={e=>setPerformedReps(e.target.value)} className="border-2 border-[#E6C85C] rounded-xl" />
              <p className="text-xs text-[#4A4A4A] mt-1">{diff(exercise.prescribed?.reps, performedReps)}</p>
            </div>
            <div>
              <Label className="text-[#0A0A0A]">Carga (real)</Label>
              <Input value={performedWeight} onChange={e=>setPerformedWeight(e.target.value)} placeholder="ex: 60kg" className="border-2 border-[#E6C85C] rounded-xl" />
              <p className="text-xs text-[#4A4A4A] mt-1">{diff(exercise.prescribed?.weight, performedWeight)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-[#0A0A0A]">RPE</Label>
              <Input value={rpe} onChange={e=>setRpe(e.target.value)} placeholder="0–10" className="border-2 border-[#E6C85C] rounded-xl" />
            </div>
            <div className="col-span-2">
              <Label className="text-[#0A0A0A]">Notas</Label>
              <Textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} className="border-2 border-[#E6C85C] rounded-xl" />
            </div>
          </div>

          <Button onClick={save} className="w-full bg-[#1FBF75] hover:bg-[#18a765] text-white font-semibold rounded-xl">
            <CheckCircle className="w-5 h-5 mr-2" /> Salvar execução
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
