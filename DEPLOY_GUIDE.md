# 🚀 Guía de Deploy en Render - Gandolfo Unificado

## Arquitectura de Deploy

```
gandolfo.app (Repositorio Principal)
├── / (App principal - Puerto 10000)
└── /web/ (App web via subtree - Puerto 10001)
```

## Configuración en Render

### 1. App Principal (gandolfo.app)
```yaml
Service Type: Web Service
Name: gandolfo-main
Runtime: Node.js
Region: Oregon
Branch: main
Root Directory: / (raíz)
Build Command: npm install && npm run build
Start Command: npm start
Health Check Path: /api/health
Port: 10000
```

### 2. App Web (gandolfo.app/web/)
```yaml
Service Type: Web Service  
Name: gandolfo-web
Runtime: Node.js
Region: Oregon
Branch: main
Root Directory: web
Build Command: cd web && npm install && npm run build
Start Command: cd web && npm start
Health Check Path: /api/health
Port: 10001
```

## Variables de Entorno Necesarias

### Para ambos servicios:
- `NODE_ENV=production`
- `SENDGRID_API_KEY=tu_api_key`
- `FROM_EMAIL=noreply@gandolfo.app`

### Para la app web específicamente:
- `VITE_API_URL=https://gandolfo-main.onrender.com/api`
- `VITE_APP_URL=https://gandolfo-web.onrender.com`

## Configuración de Dominios

### En Render Dashboard:
1. **gandolfo-main**: 
   - Custom Domain: `gandolfo.app`
   - Custom Domain: `www.gandolfo.app`

2. **gandolfo-web**:
   - Custom Domain: `web.gandolfo.app`
   - O configurar redirect desde `gandolfo.app/web/*`

## Pasos para Deploy

### 1. Preparar repositorio unificado:
```bash
# En el repositorio principal
git subtree add --prefix=web https://github.com/tu-usuario/gandolfoweb.git main --squash
```

### 2. Configurar servicios en Render:
- Crear dos Web Services desde el mismo repositorio
- Configurar diferentes Root Directory para cada uno
- Configurar variables de entorno

### 3. Configurar dominios:
- Configurar DNS para apuntar a Render
- Configurar SSL automático

## Comandos Git Subtree

```bash
# Actualizar subtree desde repo web
git subtree pull --prefix=web origin-web main --squash

# Enviar cambios al repo web
git subtree push --prefix=web origin-web main

# Agregar remote para el repo web
git remote add origin-web https://github.com/tu-usuario/gandolfoweb.git
```

## Estructura de Archivos Importante

```
gandolfo.app/
├── package.json (app principal)
├── server.js (app principal)
├── render.yaml (config principal)
└── web/
    ├── package.json (app web)
    ├── server.cjs (app web)
    ├── render.yaml (config web)
    └── dist/ (build web)
```

## Verificación Post-Deploy

1. ✅ `https://gandolfo.app` → App principal
2. ✅ `https://web.gandolfo.app` → App web
3. ✅ Health checks funcionando
4. ✅ Variables de entorno configuradas
5. ✅ SSL activo en ambos dominios
