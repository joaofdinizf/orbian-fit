'use client';
import { ReactNode } from 'react';
import { isEnabled, type FeatureFlag } from '@/lib/featureFlags';

type Props = {
  flag: FeatureFlag;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function Guard({ flag, children, fallback }: Props) {
  if (!isEnabled(flag)) {
    return (
      fallback ?? (
        <div className="p-6 rounded-xl border border-dashed text-sm text-gray-600">
          Este módulo está desativado. Habilite <code>NEXT_PUBLIC_FLAG_{flag.toUpperCase()}</code>.
        </div>
      )
    );
  }
  return <>{children}</>;
}
