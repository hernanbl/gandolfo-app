#!/bin/bash

# Script para deploy local de Gandolfo Web

echo "🚀 Iniciando deploy local de Gandolfo Web..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Construir la aplicación
echo "🏗️ Construyendo aplicación..."
npm run build

# Verificar que la carpeta dist existe
if [ ! -d "dist" ]; then
    echo "❌ Error: La carpeta dist no se generó correctamente"
    exit 1
fi

echo "✅ Build completado exitosamente"

# Iniciar servidor
echo "🌐 Iniciando servidor en puerto 3000..."
echo "📱 La aplicación estará disponible en: http://localhost:3000"
echo "🛑 Usa Ctrl+C para detener el servidor"

npm start
