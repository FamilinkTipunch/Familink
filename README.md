# Familink (Equipe Ti Punch)

## Installation

Pour lancer correctement l'application il faut:
* Supprimer le dossier node_module
* lancer la commande: `npm install react-native-side-menu --save`
* lancer ensuite la commande: `npm install react-native-actionsheet --save`
* puis: `npm install --save react-native-loading-spinner-overlay`
* puis: `npm install --save react-native-popup`
* puis: `npm install --save react-navigation`
* puis: `npm install --save react-native-simple-toast`
* lancer: `npm install --save lodash`
* et enfin: `npm install react-native-alphabetlistview  --save `

ou par yarn:
* `yarn add react-native-side-menu`
* `yarn add react-native-actionsheet`
* `yarn add react-native-loading-spinner-overlay`
* `yarn add react-native-popup`
* `yarn add react-navigation`
* `yarn add react-native-simple-toast`
* `yarn add lodash`
* `yarn add react-native-alphabetlistview`

puis lancer la commande: `yarn`


## Gestion des erreurs

* Dans le cas d'une erreur du type : TypeError: Cannot read property 'short' of undefined. Le problème viens du composant simple-toast.

Procédure:

* Se placer dans le repertoire courant de l'application
* `react-native unlink react-native-simple-toast`
* `react-native link react-native-simple-toast`

## Definition de «Done»

* Ensemble des tests Jest pour une fonctionnalité
* Tests sur les plateformes iOS et Android
* Revue de code
* Valider la Pull Request

## Tests unitaires

Les tests unitaires sont composés de 2 parties :
* Scenarii d'erreurs
* Scenarii déroulement usuel

Chaque test effectué doit être renseigné dans les champs commentaires de la pull request avec un tag signalant un test et être :
* explicités pour les résultats atterndus
* explicités pour les résultats réels
* corroborés pour les résultats atterndus
* corroborés pour les résultats réels

## Liste des outils utilisés

* GitHub (gestionnaire de version)
* EsLint (respect de convention de codage classique)
* BuddyBuld (gestion de l'intégration et déploiement continu et du feedback utilisateur)
* Jest (mise en place de cas de test)

## Documents utiles

Les documents de gestion de projet sont stockés dans le «dossier» contenant :
* Les BurnUp et BurnDown charts
* Le protuct Backlog
* Le Backlog d'itération

Palette de couleur choisis :
https://color.adobe.com/fr/Happy-Halloween-color-theme-9877044/
