#!/bin/bash

# Script para configurar Git Subtree
# Este script debe ejecutarse desde el repositorio PRINCIPAL donde quieres integrar gandolfoweb

echo "🔗 Configurando Git Subtree para Gandolfo Web..."

# Variables - AJUSTA ESTAS URLs SEGÚN TUS REPOSITORIOS
MAIN_REPO_URL="https://github.com/hernanbl/gandolfo-app.git"
WEB_REPO_URL="https://github.com/hernanbl/gandolfowebapp.git"
WEB_SUBTREE_PATH="web"

echo "📂 Repositorio principal: $MAIN_REPO_URL"
echo "🌐 Repositorio web: $WEB_REPO_URL"
echo "📁 Ruta del subtree: $WEB_SUBTREE_PATH"

# Verificar que estamos en un repositorio git
if [ ! -d ".git" ]; then
    echo "❌ Error: No estás en un repositorio Git"
    echo "💡 Ejecuta este script desde la raíz de tu repositorio principal"
    exit 1
fi

# Agregar el repositorio web como remote si no existe
if ! git remote get-url web-repo >/dev/null 2>&1; then
    echo "📡 Agregando remote para el repositorio web..."
    git remote add web-repo $WEB_REPO_URL
fi

# Agregar el subtree
echo "🌳 Agregando subtree desde $WEB_REPO_URL..."
git subtree add --prefix=$WEB_SUBTREE_PATH web-repo main --squash

echo "✅ Subtree configurado exitosamente!"
echo ""
echo "📋 Comandos útiles para el futuro:"
echo "   • Actualizar subtree:  git subtree pull --prefix=$WEB_SUBTREE_PATH web-repo main --squash"
echo "   • Enviar cambios:      git subtree push --prefix=$WEB_SUBTREE_PATH web-repo main"
echo ""
echo "🚀 Estructura de deploy en Render:"
echo "   • App principal (gandolfo.app):     Usar la raíz del repositorio"
echo "   • App web (gandolfo.app/web/):      Usar la carpeta /$WEB_SUBTREE_PATH"
