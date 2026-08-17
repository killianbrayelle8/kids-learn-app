# 🌐 Mettre KidLearn en ligne (pour être trouvable sur Google)

L'app tourne sur ton PC en local. Pour qu'elle ait une **vraie URL publique** et
qu'elle apparaisse sur Google, il faut l'héberger. Voici les options, de la plus
rapide à la plus pro.

## Option A — GitHub Pages (GRATUIT, ~10 min, recommandé pour démarrer)
1. Crée un compte sur github.com (c'est gratuit).
2. Crée un nouveau dépôt public nommé `kidlearn`.
3. Uploade TOUS les fichiers du dossier `kids-learn-app/` à la racine du dépôt
   (glisser-déposer dans l'interface web, ou via GitHub Desktop).
4. Dans le dépôt : Settings → Pages → Source = "main" / "root" → Save.
5. L'URL apparaît après ~1 min : `https://TON-PSEUDO.github.io/kidlearn/`
6. **Remplace** dans les fichiers les `https://TON-SITE.example/kidlearn/` par cette URL :
   - `index.html` (canonical, og:url, JSON-LD)
   - `robots.txt` et `sitemap.xml`
7. Demande à Google de crawler : https://search.google.com/search-console
   → "Inspecter une URL" → colle ton URL → "Demander l'indexation".
   ⏱️ Ça prend quelques jours à quelques semaines.

## Option B — Ton propre domaine (ex. kidlearn.fr)
- Achète un nom de domaine (OVH, Gandi, Namecheap ~ 10 €/an).
- Héberge via GitHub Pages + "Custom domain", OU un hébergement web classique.
- Pour la **vente par abonnement réelle**, il te faudra un vrai serveur + Stripe
  (même que tes e-books) — voir section abonnement du README.

## Option C — Hébergement static gratuit (Netlify / Vercel / Cloudflare Pages)
- Comptes gratuits, glisser-déposer le dossier, URL immédiate en `*.netlify.app`.
- Proche de GitHub Pages, sans Git si tu préfères.

## ⚠️ Ce que je ne peux PAS faire depuis ton PC seul
- Générer une URL internet sans hébergement (ton PC n'est pas joignable de
  l'extérieur, et aucun tunnel/outil de déploiement n'est installé ici).
- Forcer Google à indexer instantanément (le crawl prend du temps, c'est normal).

## 🔍 Référencement (déjà inclus dans ce dossier)
- `index.html` : titre + description + Open Graph + données structurées Schema.org
- `robots.txt` et `sitemap.xml` : indiquent l'app à Google
- À faire une fois en ligne : remplacer `TON-SITE.example` par ta vraie URL,
  puis soumettre le sitemap dans Google Search Console.
