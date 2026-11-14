# Observatoire des transitions — modèle de blog

Modèle de blog statique basé sur Astro + Pages CMS, hébergé sur GitHub Pages.

## Ce qui est inclus

- Page d'accueil éditoriale
- Bibliothèque de publications
- Recherche textuelle et filtres par thématique
- Pages individuelles avec source originale
- Design responsive, sans police externe ni framework JavaScript côté serveur
- Configuration Pages CMS dans `.pages.yml`
- Un article de bienvenue modifiable

## Mise en ligne sur GitHub Pages (sans terminal)

1. Dans le dépôt GitHub, choisir **Add file > Upload files** et déposer le contenu du dossier décompressé, y compris les éléments cachés `.github/` et `.pages.yml` (afficher les fichiers masqués sur l'ordinateur pour les voir). Les fichiers existants sont remplacés.
2. Valider avec **Commit changes**.
3. Dans **Settings > Pages**, choisir **GitHub Actions** comme source.
4. Onglet **Actions** > « Publication du blog » > **Run workflow**. Le site est en ligne en une à deux minutes à l'adresse `https://pseudo.github.io/nom-du-depot/`.
5. Dans https://app.pagescms.org/, se connecter avec GitHub, autoriser Pages CMS sur ce dépôt, puis ouvrir le dépôt.

L'adresse et le sous-dossier sont détectés automatiquement : aucun réglage à faire dans `astro.config.mjs`. Un nom de domaine personnalisé peut être ajouté plus tard dans Settings > Pages > Custom domain.

## Ajouter une publication

Dans Pages CMS > Publications > New entry :
- renseigner le titre, la date, le type et les thématiques ;
- ajouter un résumé court ;
- renseigner l'organisme et l'URL de la source ;
- écrire le contenu dans « Contenu de l'article » ;
- laisser « Brouillon » désactivé pour publier.

L'enregistrement modifie le dépôt GitHub, qui republie alors le site automatiquement.

## Personnalisation à faire avant la publication publique

- Pour changer le nom du site ou la liste des thématiques, modifier `src/site.ts` (et les thématiques aussi dans `.pages.yml`).
- Vérifier les mentions légales et la politique de confidentialité si des outils de mesure d'audience ou formulaires sont ajoutés.
- Vérifier les droits des images utilisées.

## Notes

Le site public est généré en HTML statique. Pages CMS est l'interface d'administration distante ; il n'y a pas de base de données de contenu ni de serveur CMS à maintenir. Les contenus restent dans le dépôt GitHub.
