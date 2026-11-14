import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Pages CMS peut enregistrer un champ laissé vide sous forme de "" ou null.
// Ces aides évitent qu'un champ vide fasse échouer la publication.
const empty = (v: unknown) => (v === null || v === '' ? undefined : v);
const str = () => z.preprocess(empty, z.string().optional()).transform((v) => v ?? '');
const list = () => z.preprocess((v) => (v == null || v === '' ? [] : Array.isArray(v) ? v : [v]), z.array(z.string()));
const bool = () => z.preprocess((v) => v === true || v === 'true', z.boolean());

const TYPES = ['Actualité', 'Ressource', 'Analyse', 'Événement'] as const;

const veille = defineCollection({
  loader: glob({ base: './src/content/veille', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.preprocess((v) => (TYPES.includes(v as any) ? v : 'Ressource'), z.enum(TYPES)),
    themes: list(),
    tags: list(),
    author: str(),
    source: str(),
    // Ajoute https:// si l'adresse a été saisie sans
    sourceUrl: str().transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v)),
    summary: str(),
    featured: bool(),
    draft: bool(),
    cover: z.preprocess(empty, z.string().optional()),
  }),
});

// Briefs du lundi : le contenu suit la structure ## Urgent / ## À suivre /
// ## Contexte / ## Signal de la semaine, avec un ### par élément.
const briefs = defineCollection({
  loader: glob({ base: './src/content/briefs', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: str(),
    themes: list(),
    draft: bool(),
  }),
});

export const collections = { veille, briefs };
