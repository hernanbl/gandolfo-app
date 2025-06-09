# 🚀 Instrucciones para crear Git Subtree

## 1. Crear repositorio en GitHub

Ve a https://github.com/hernanbl y crea un nuevo repositorio:
- **Nombre**: `gandolfoweb`
- **Descripción**: "Gandolfo Web Application - Sistema de reservas de restaurante"
- **Visibilidad**: Público o Privado según tu preferencia
- **NO inicializar** con README, .gitignore, o license (ya los tenemos)

## 2. Agregar remote y hacer push inicial

Ejecuta estos comandos en la terminal desde /Volumes/AUDIO/gandolfoweb:

```bash
# Agregar el remote de GitHub
git remote add origin https://github.com/hernanbl/gandolfoweb.git

# Hacer push inicial
git push -u origin main
```

## 3. Configurar el repositorio principal (gandolfo-app)

Si aún no tienes el repositorio principal, créalo:
- **Nombre**: `gandolfo-app`
- **Descripción**: "Gandolfo App - Aplicación principal unificada"

## 4. Configurar Git Subtree

### Opción A: Desde un repositorio principal existente
```bash
# Ir al repositorio principal
cd /ruta/a/gandolfo-app

# Agregar subtree
git subtree add --prefix=web https://github.com/hernanbl/gandolfoweb.git main --squash
```

### Opción B: Crear repositorio principal nuevo
```bash
# Crear directorio para app principal
mkdir /Volumes/AUDIO/gandolfo-app
cd /Volumes/AUDIO/gandolfo-app

# Inicializar repositorio
git init
git branch -m main

# Crear estructura básica
echo "# Gandolfo App" > README.md
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore

# Hacer commit inicial
git add .
git commit -m "Initial commit: Gandolfo App main repository"

# Agregar remote
git remote add origin https://github.com/hernanbl/gandolfo-app.git

# Push inicial
git push -u origin main

# Agregar subtree web
git subtree add --prefix=web https://github.com/hernanbl/gandolfoweb.git main --squash
```

## 5. Comandos útiles para el futuro

```bash
# Actualizar subtree desde repo web
git subtree pull --prefix=web https://github.com/hernanbl/gandolfoweb.git main --squash

# Enviar cambios del subtree al repo web
git subtree push --prefix=web https://github.com/hernanbl/gandolfoweb.git main

# Ver el estado del subtree
git log --oneline --graph --decorate
```

## 6. Estructura final esperada

```
gandolfo-app/
├── README.md (app principal)
├── package.json (app principal)
├── server.js (app principal)
└── web/ (subtree de gandolfoweb)
    ├── package.json
    ├── server.cjs
    ├── src/
    └── dist/
```

## ✅ Siguiente paso
Una vez creado el repo en GitHub, ejecuta el push inicial y luego procede con la configuración del subtree.
