#!/bin/bash
RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'; ERRORS=0
check() { [ $1 -eq 0 ] && echo -e "${GREEN}✅ $2${NC}" || { echo -e "${RED}❌ $2${NC}"; ERRORS=$((ERRORS+1)); } }

echo "=== VALIDATION calculateurdumaroc.com ==="

COUNT=$(grep -ril "salairemaroc" --include="*.html" . | grep -v .git | wc -l)
check $COUNT "Aucun SalaireMaroc"

COUNT=$(grep -rl "img src.*hero\|manuscdn" --include="*.html" . | grep -v .git | wc -l)
check $COUNT "Pas d image hero externe"

COUNT=$(grep -r "href=\"#smig\"\|href=\"#cnss\"\|href=\"#primes\"" --include="*.html" . | grep -v .git | wc -l)
check $COUNT "Aucun lien mort"

COUNT=$(grep -rl "bulletin de paie" --include="*.html" . | grep -v .git | wc -l)
[ $COUNT -gt 0 ]; check $? "Texte bandeau Excel correct"

for FILE in index.html auto-entrepreneur/index.html auto-entrepreneur/inscription/index.html auto-entrepreneur/declaration/index.html auto-entrepreneur/activites/index.html smig-maroc-2026/index.html bareme-ir-maroc-2026/index.html; do
  COUNT=$(grep -c "</html>" "$FILE" 2>/dev/null || echo 0)
  [ $COUNT -eq 1 ]; check $? "$FILE HTML valide"
done

echo ""; [ $ERRORS -eq 0 ] && echo -e "${GREEN}✅ OK pour commit${NC}" || echo -e "${RED}❌ $ERRORS erreur(s)${NC}"