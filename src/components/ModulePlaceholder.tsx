'use client';
import Guard from './Guard';
import type { FeatureFlag } from '@/lib/featureFlags';

type Props = {
  flag: FeatureFlag;
  title: string;
  description: string;
  nextSteps?: string[];
};

export default function ModulePlaceholder({ flag, title, description, nextSteps }: Props) {
  return (
    <Guard flag={flag}>
      <section className="rounded-xl border bg-white p-6 space-y-4">
        <header>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </header>

        {nextSteps?.length ? (
          <div className="mt-2">
            <h2 className="font-semibold mb-1">Próximos passos sugeridos:</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {nextSteps.map((s, i) => (<li key={i}>{s}</li>))}
            </ul>
          </div>
        ) : null}

        <div className="text-xs text-gray-500">
          Flag: <code>NEXT_PUBLIC_FLAG_{flag.toUpperCase()}</code>
        </div>
      </section>
    </Guard>
  );
}
