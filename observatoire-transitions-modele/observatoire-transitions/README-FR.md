# Observatoire des transitions — modèle de blog

Modèle de blog statique basé sur Astro + Pages CMS, prévu pour un hébergement Cloudflare Pages.

## Ce qui est inclus

- Page d'accueil éditoriale
- Bibliothèque de publications
- Recherche textuelle et filtres par thématique
- Pages individuelles avec source originale
- Design responsive, sans police externe ni framework JavaScript côté serveur
- Configuration Pages CMS dans `.pages.yml`
- Un article de bienvenue modifiable

## Mise en ligne (sans terminal)

1. Créer un compte GitHub sur https://github.com/ si nécessaire.
2. Créer un dépôt vide nommé `observatoire-transitions`.
3. Décompresser cette archive sur votre ordinateur.
4. Dans le dépôt GitHub, choisir **Add file > Upload files** et déposer le contenu du dossier décompressé (y compris les dossiers `src`, `public` et le fichier caché `.pages.yml`).
5. Valider avec **Commit changes**.
6. Dans https://app.pagescms.org/, se connecter avec GitHub, autoriser Pages CMS sur ce dépôt, puis ouvrir le dépôt. La configuration `.pages.yml` doit faire apparaître la collection « Publications ».
7. Dans Cloudflare, ouvrir **Workers & Pages > Create application > Pages > Connect to Git**, choisir le dépôt et configurer :
   - Production branch : `main`
   - Build command : `npm run build`
   - Build output directory : `dist`
8. Lancer le déploiement. Cloudflare fournit une adresse `*.pages.dev`.

## Ajouter une publication

Dans Pages CMS > Publications > New entry :
- renseigner le titre, la date, le type et les thématiques ;
- ajouter un résumé court ;
- renseigner l'organisme et l'URL de la source ;
- écrire le contenu dans « Contenu de l'article » ;
- laisser « Brouillon » désactivé pour publier.

L'enregistrement modifie le dépôt GitHub. Cloudflare reconstruit alors le site automatiquement.

## Personnalisation à faire avant la publication publique

- Remplacer « Observatoire des transitions » par le nom définitif.
- Remplacer `https://example.pages.dev` dans `astro.config.mjs` par l'adresse publique définitive.
- Vérifier les mentions légales et la politique de confidentialité si des outils de mesure d'audience ou formulaires sont ajoutés.
- Vérifier les droits des images utilisées.

## Notes

Le site public est généré en HTML statique. Pages CMS est l'interface d'administration distante ; il n'y a pas de base de données de contenu ni de serveur CMS à maintenir. Les contenus restent dans le dépôt GitHub.
