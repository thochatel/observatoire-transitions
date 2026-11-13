import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const veille = defineCollection({
  loader: glob({ base: './src/content/veille', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['Actualité', 'Ressource', 'Analyse', 'Événement']).default('Ressource'),
    themes: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    author: z.string().default(''),
    source: z.string().default(''),
    sourceUrl: z.string().url().or(z.literal('')).default(''),
    summary: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string().optional()
  })
});

export const collections = { veille };
