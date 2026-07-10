import type { Language } from '../data/types';

const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function localizedRoute(route: string, lang: Language): string {
  const normalized = route === '/' ? '/' : `/${route.replace(/^\/+|\/+$/g, '')}/`;
  if (lang === 'en') return withBase(normalized);
  return withBase(normalized === '/' ? '/zh/' : `/zh${normalized}`);
}

export function alternateLanguage(lang: Language): Language {
  return lang === 'en' ? 'zh' : 'en';
}
