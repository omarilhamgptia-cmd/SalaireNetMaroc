# CLAUDE.md — Règles permanentes du projet calculateurdumaroc.com

## ⚠️ RÈGLES ABSOLUES — À LIRE AVANT TOUTE ACTION

### 1. SOURCE DE VÉRITÉ VISUELLE
- Le fichier `index.html` est la SEULE référence de style
- Toute nouvelle page DOIT copier : CSS vars :root, fonts Google, 
  header.topbar, footer.site-footer depuis index.html
- JAMAIS utiliser les pages AE comme template pour des pages hors silo AE

### 2. HERO IMAGE — FIGÉ DÉFINITIVEMENT
- Le hero est le SVG inline dans index.html (fond #1A1816, 
  formes géométriques dégradé marron/terracotta)
- NE JAMAIS remplacer le SVG inline par une balise <img>
- NE JAMAIS modifier le contenu visuel du SVG hero
- NE JAMAIS charger hero.svg comme fichier externe (<img src="/hero.svg">)
- Ce design est PERMANENT et ne doit plus jamais changer

### 3. BRANDING
- Le nom du site partout : CalculateurDuMaroc.com
- JAMAIS : SalaireMaroc.ma, salairemaroc.ma ou toute variation
- Copyright : © 2026 CalculateurDuMaroc.com

### 4. BANDEAU EXCEL — STRUCTURE CORRECTE
Le bandeau Excel DOIT avoir cette structure exacte :
```html