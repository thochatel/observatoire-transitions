// Réglages centraux du site : modifier ici le nom et les thématiques.
export const SITE_NAME = 'Observatoire des transitions';
export const SITE_DESCRIPTION = 'Veille, ressources et analyses sur la transition écologique.';

// Libellés affichés pour les thématiques (les clés correspondent à .pages.yml)
export const THEMES: Record<string, string> = {
  climat: 'Climat',
  adaptation: 'Adaptation',
  biodiversite: 'Biodiversité',
  territoires: 'Politiques territoriales',
  mobilites: 'Mobilités',
  alimentation: 'Alimentation',
  numerique: 'Numérique responsable',
  reglementation: 'Réglementation',
  sobriete: 'Sobriété',
  energie: 'Énergie',
};
export const themeLabel = (key: string) => THEMES[key] ?? key;

// Construit un lien interne qui fonctionne aussi sous un sous-dossier GitHub Pages
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '/') => `${BASE}${path.startsWith('/') ? path : '/' + path}`;

// Ajoute le préfixe aux chemins d'images locaux (/images/...)
export const asset = (src?: string) =>
  src && src.startsWith('/') && !src.startsWith('//') ? url(src) : src;

export const dateFmt = (date: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
