'use client';
import { toPng } from 'html-to-image';

export async function exportNodeToPNG(node: HTMLElement, fileName: string) {
  // qualidade/escala alta p/ redes sociais
  const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
  const link = document.createElement('a');
  link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
  link.href = dataUrl;
  link.click();
  return dataUrl; // caso queira compartilhar via Web Share API
}
