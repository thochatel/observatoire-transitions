import { defineConfig } from 'astro/config';

// SITE et BASE_PATH sont fournis automatiquement par la GitHub Action.
// Sur GitHub Pages, un dépôt « observatoire-transitions » est servi sous
// https://pseudo.github.io/observatoire-transitions/ : tous les liens doivent
// donc tenir compte de ce préfixe.
const site = process.env.SITE || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';
const prefix = base.replace(/\/$/, '');

// Ajoute le préfixe aux images insérées depuis Pages CMS (/images/...)
function rehypeBaseImages() {
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      const src = node.properties?.src;
      if (typeof src === 'string' && src.startsWith('/') && !src.startsWith('//') && prefix && !src.startsWith(prefix + '/')) {
        node.properties.src = prefix + src;
      }
    }
    (node.children || []).forEach(walk);
  };
  return (tree) => walk(tree);
}

// Briefs du lundi : regroupe chaque niveau (## Urgent, ## À suivre, ## Contexte,
// ## Signal de la semaine) dans un bloc <section> pour la mise en forme.
const textOf = (n) => n.type === 'text' ? n.value : (n.children || []).map(textOf).join('');
const tierOf = (title) => {
  const t = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (t.includes('urgent')) return 'urgent';
  if (t.includes('suivre')) return 'suivre';
  if (t.includes('contexte')) return 'contexte';
  if (t.includes('signal')) return 'signal';
  return 'autre';
};
function rehypeBriefSections() {
  return (tree, file) => {
    const path = String(file?.path || file?.history?.[0] || '').replace(/\\/g, '/');
    if (!path.includes('/content/briefs/')) return;
    const out = [];
    let current = null;
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        current = { type: 'element', tagName: 'section', properties: { className: ['tier', `tier-${tierOf(textOf(node))}`] }, children: [node] };
        out.push(current);
      } else if (current) {
        current.children.push(node);
      } else {
        out.push(node);
      }
    }
    tree.children = out;
  };
}

export default defineConfig({
  site,
  base,
  output: 'static',
  markdown: { rehypePlugins: [rehypeBaseImages, rehypeBriefSections] },
});
