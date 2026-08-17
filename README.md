# 🌟 KidLearn — App éducative pour enfants (0 à 13 ans)

Prototype d'application web (PWA) qui apprend aux enfants les **mathématiques**, le
**français** et l'**anglais** par le biais de vidéos éducatives sélectionnées.

Conçue pour être utilisée sur le **téléphone des parents** : gros boutons, zéro pub,
verrou parental, récompenses en étoiles et **filtrage par âge**.

## ✨ Fonctionnalités
- 🎂 **Navigation par âge** : 5 tranches de 0 à 13 ans (le parent/grand choisit l'âge)
- 🏠 **Puis par matière** : Mathématiques 🔢, Français 📚, Anglais 🔤
- 🎬 Lecteur vidéo YouTube "enfant-friendly" (mode privacy-enhanced)
- ⭐ Système de récompense : 1 étoile par vidéo + 1 étoile bonus par quiz réussi
- 🎯 **Quiz interactifs** après chaque vidéo (choix multiples, feedback immédiat)
- 💎 **Abonnement freemium** : quelques vidéos gratuites, le reste verrouillé derrière le Pass Premium (3,99 €/mois)
- 🔒 Verrou parental (calcul simple) pour l'espace parents
- 📊 Espace parents : étoiles, vidéos vues, statut abonnement, résiliation (démo)
- 📱 Installable sur l'écran d'accueil (PWA, fonctionne hors-ligne pour la coquille)

## 💎 Système d'abonnement (freemium)
- Chaque vidéo a `gratuit: true` (libre) ou `gratuit: false` (verrouillée).
- Sans abonnement : les vidéos payantes affichent « 🔒 Abonnement requis » et redirigent vers l'écran d'abonnement.
- L'écran « Pass Premium » propose le déblocage (prix démo 3,99 €/mois).
- **En démo**, le paiement est simulé (clic = abonnement actif, sauvegardé en `localStorage`).
- **En production**, remplacer `subscribePay` (app.js) par un appel à TON serveur Stripe
  (création d'une Checkout Session), puis `setPremium(true)` après confirmation du webhook.
  C'est le même Stripe que pour tes e-books.

## 🧒 Les tranches d'âge
| Tranche | Niveau | Matières |
|---------|--------|----------|
| 👶 0-2 ans | Éveil | Maths, Français (comptines, couleurs, formes) |
| 🧒 3-5 ans | Maternelle | Maths, Français, Anglais |
| 🧑 6-8 ans | CP / CE1 | Maths, Français, Anglais |
| 📚 9-11 ans | CM1 / CM2 | Maths, Français, Anglais |
| 🎓 12-13 ans | Collège | Maths, Français, Anglais |

Toutes les vidéos sont en **français** sauf la matière **Anglais**.

## 🚀 Lancer le prototype (test sur ordinateur)
```bash
cd kids-learn-app
python -m http.server 8000
# ouvre http://localhost:8000
```

## 📱 Tester sur un vrai téléphone (même réseau Wi-Fi)
1. Lance le serveur ci-dessus sur ton PC.
2. Sur le téléphone, ouvre `http://<IP-de-ton-PC>:8000`
   (ex. `http://192.168.1.24:8000` — trouve l'IP avec `ipconfig` sur Windows).
3. Menu du navigateur → « Ajouter à l'écran d'accueil » pour l'installer comme une app.

## ➕ Ajouter des vidéos
Ouvre `data.js`. Structure : `AGES` → tranche d'âge → `matieres` → `videos`.
```js
{ id: "XXXXXXXX", titre: "Ma vidéo", duree: "5 min", age: "6-8 ans",
  quiz: [ { question: "2+2 ?", options: ["3","4","5"], reponse: 1 } ] }
```
L'`id` est la partie `v=XXXXXXXX` de l'URL YouTube. La miniature se charge toute seule.

## ⚠️ Notes
- Les vidéos proviennent de chaînes éducatives publiques (Titounis, Tidoon, Alain le Lait,
  Bébefinn, Maître Lucas, Maths College…). Vérifie le contenu avant de laisser un enfant
  regarder seul.
- Ce prototype joue des vidéos YouTube en incrustation. Pour un produit final sans
  dépendance externe, il faudra héberger vos propres vidéos.

## 🗺️ Pistes d'évolution
- [ ] Vos propres vidéos hébergées (pas de dépendance YouTube)
- [ ] Profils multiples (plusieurs enfants + suivi par enfant)
- [ ] Contrôle parental : mot de passe + temps d'écran limité
- [ ] Version native Android/iOS (Flutter / React Native)
- [ ] Plus de matières (sciences, histoire, dessin)
