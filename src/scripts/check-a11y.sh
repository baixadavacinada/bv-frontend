#!/bin/bash

echo "♿ Checking accessibility hooks in staged components..."

# Pega arquivos staged que são componentes
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E "\.(tsx|ts)$" | grep -E "(components|sections)" || true)

if [ -z "$STAGED_FILES" ]; then
    echo "✅ No component files to check"
    exit 0
fi

MISSING_A11Y=()
CHECKED_COUNT=0

for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        # Verifica se é componente cliente interativo
        if grep -q "'use client'" "$file"; then
            # Verifica se tem elementos que precisam de validação
            if grep -qE "(onClick|onKeyDown|section|main|nav|header|footer|role=|useState|useEffect)" "$file"; then
                CHECKED_COUNT=$((CHECKED_COUNT + 1))

                # Verifica se tem pelo menos um hook de acessibilidade
                if ! grep -qE "(useAccessibilityValidation|useLiveRegion|useFocusTrap|useSkipLink)" "$file"; then
                    MISSING_A11Y+=("$file")
                fi
            fi
        fi
    fi
done

echo "📊 Checked $CHECKED_COUNT interactive components"

if [ ${#MISSING_A11Y[@]} -gt 0 ]; then
    echo ""
    echo "❌ Components missing accessibility validation:"
    for file in "${MISSING_A11Y[@]}"; do
        echo "   🔸 $file"
    done
    echo ""
    echo "📋 How to fix:"
    echo "   1. Add this import: import { useAccessibilityValidation } from '@/hooks/use-accessibility'"
    echo "   2. Add this hook: useAccessibilityValidation({ enabled: true })"
    echo ""
    echo "💡 Example:"
    echo "   export function MyComponent() {"
    echo "     useAccessibilityValidation({ enabled: true })"
    echo "     // ... rest of component"
    echo "   }"
    echo ""
    exit 1
else
    echo "✅ All interactive components have accessibility hooks!"
    exit 0
fi
