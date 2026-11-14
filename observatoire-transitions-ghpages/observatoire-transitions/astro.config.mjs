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

export default defineConfig({
  site,
  base,
  output: 'static',
  markdown: { rehypePlugins: [rehypeBaseImages] },
});
