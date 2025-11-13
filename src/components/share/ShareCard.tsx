'use client';

import { forwardRef } from 'react';

interface ShareCardProps {
  title: string;
  subtitle?: string;
  stats?: Array<{ label: string; value: string | number }>;
  footer?: string;
  // opcional: imagem/avatar
  imageUrl?: string;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(function ShareCard(
  { title, subtitle, stats = [], footer, imageUrl },
  ref
) {
  return (
    <div
      ref={ref}
      className="w-[1080px] h-[1350px] bg-gradient-to-br from-[#0A0A0A] to-[#1b1b1b] text-white p-16 rounded-[48px] flex flex-col justify-between"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
    >
      <div className="flex items-center gap-16">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="cover"
            className="w-48 h-48 rounded-3xl object-cover border-4 border-[#FFC300]"
          />
        ) : null}
        <div>
          <h1 className="text-6xl font-extrabold leading-tight">{title}</h1>
          {subtitle && <p className="text-2xl text-white/80 mt-3">{subtitle}</p>}
        </div>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-6 mt-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-white/70 text-xl">{s.label}</div>
              <div className="text-5xl font-bold mt-2 text-[#FFC300]">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-white/70">
          {footer ?? 'Gerado por Orbian Fit • orbian.fit'}
        </div>
        <div className="px-6 py-3 rounded-2xl bg-[#FFC300] text-[#0A0A0A] font-bold">
          #TreinoOrbian
        </div>
      </div>
    </div>
  );
});

export default ShareCard;
