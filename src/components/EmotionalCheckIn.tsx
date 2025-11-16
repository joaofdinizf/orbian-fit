'use client';

import { useState } from 'react';
import { Smile, Meh, Frown, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

interface EmotionalCheckInProps {
  userRole?: 'trainer' | 'student';
  onSave?: (payload: { mood: number; note: string }) => void;
  // deixa aberto pra qualquer outra prop que já esteja sendo passada
  [key: string]: any;
}

const moods = [
  { value: 1, label: 'Ruim', icon: Frown, color: 'text-red-500' },
  { value: 2, label: 'Neutro', icon: Meh, color: 'text-yellow-500' },
  { value: 3, label: 'Bem', icon: Smile, color: 'text-green-500' },
];

export default function EmotionalCheckIn({
  userRole = 'student',
  onSave,
}: EmotionalCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedMood) {
      alert('Escolha como você está se sentindo hoje.');
      return;
    }

    try {
      setSaving(true);

      // callback externa se tiver
      if (onSave) {
        await onSave({ mood: selectedMood, note });
      }

      // aqui você pode plugar Supabase depois
      console.log('[EmotionalCheckIn] Salvar check-in:', {
        userRole,
        mood: selectedMood,
        note,
      });

      alert('Check-in registrado com sucesso!');
      setNote('');
      setSelectedMood(null);
    } catch (error) {
      console.error('Erro ao salvar check-in emocional:', error);
      alert('Erro ao salvar seu check-in. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Check-in emocional</span>
          <span className="text-xs font-normal text-muted-foreground">
            Papel: {userRole === 'trainer' ? 'Professor' : 'Aluno'}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Como você está se sentindo hoje?
          </p>
          <div className="flex gap-3">
            {moods.map(({ value, label, icon: Icon, color }) => {
              const isActive = selectedMood === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedMood(value)}
                  className={`flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-xs transition hover:bg-accent hover:text-accent-foreground ${
                    isActive ? 'bg-accent text-accent-foreground border-primary' : ''
                  }`}
                >
                  <Icon className={`mb-1 h-6 w-6 ${color}`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Quer deixar algum comentário rápido?
          </p>
          <textarea
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
            rows={3}
            placeholder="Ex: Dormi mal, treino foi pesado, estou muito motivado..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? 'Salvando...' : 'Salvar'}
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
