# Nonna Cocktails
## Introduction
Nonna Cocktails est une application de recherche et de visualisation de cocktails et de gestion de ses cocktails favoris. Elle inclus une interface utilisateur web et permet une gestion basique des données de l'utilisateur.

## Démarrage du projet
Pour lancer le projet, exécuter les commandes `npm install` et `npm start` à la racine du projet. 
Vous pouvez également visualiser la démonstration sur [Heroku](https://nonna-cocktails-frontend.herokuapp.com/).

## Technologies Utilisées
### Frontend
- React.js
  - Helmet
  - React Router
  - Babel
  - Axios pour les requêtes REST au backend
  - jspdf pour la génération de PDFs
  - D'autres librairies pour la gestion des icones, dates, tables, etc. (cf. [package.json](package.json))
- Material UI (MUI)
  - [Template de dashboard - Material kit react](https://mui.com/store/items/minimal-dashboard-free/)
  - [Tous les composants sont listés ici](https://mui.com/material-ui/getting-started/overview/)


## Backend
- Spring
  - Spring Data Rest
  - Spring Security
- H2
- JWT
- Unirest Java
- Express.js
- Heroku Maven Plugin pour le déploiement sur Heroku


## Architecture
### Dossier racine
Contient les fichiers de configuration du projet tel que `package.json`, `.gitignore`, `jsconfig.json`, etc.
Nous y trouvons également un fichier Procfile pour le déploiement dans un "Dyno" Heroku.

### Dossier backend/
Ce dossier contient tous les fichiers sources pour build le backend et le déployer sur Heroku avec Maven.

### Dossier node_modules/
Ce dossier contient toutes les dépendances du projet. Pour l'installer, il faut lancer la commande `npm install` sur le projet.

### Dossier public/
Ce dossier contient tous les éléments statiques de l'application web (logos, index.html de base, etc.).

### Dossier src/
Contient tous les fichiers sources React du projet.

### Dossier scripts/
Contient le fichier pour lancer un serveur Express.js lors d'un déploiement dans Heroku 

