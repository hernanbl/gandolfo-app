# 🚀 Migración a Render - Repositorio Unificado

## 📋 Plan de Migración

### Paso 1: Configurar Servicio Principal
```yaml
Service Name: gandolfo-main
Repository: hernanbl/gandolfo-app
Branch: main
Root Directory: / (raíz)
Build Command: npm install
Start Command: npm start
Environment Variables:
  - NODE_ENV=production
  - PORT=10000
  - (migrar variables existentes de gandolfo-resto-system-1)
```

### Paso 2: Configurar Servicio Web
```yaml
Service Name: gandolfo-web
Repository: hernanbl/gandolfo-app
Branch: main
Root Directory: web
Build Command: cd web && npm install && npm run build
Start Command: cd web && npm start
Environment Variables:
  - NODE_ENV=production
  - PORT=10001
  - BASE_PATH=/web
```

## 🔄 Opciones de Migración

### Opción A: Migración Gradual
1. Mantener `gandolfo-resto-system-1` funcionando
2. Crear `gandolfo-web` nuevo servicio
3. Probar todo funcione
4. Migrar `gandolfo-main` cuando esté listo

### Opción B: Migración Completa
1. Cambiar repositorio de servicio existente
2. Actualizar configuración
3. Crear segundo servicio para web
4. Configurar dominios

## 🌐 Configuración de Dominios

### Configuración Actual (migrar):
- `gandolfo.app` → gandolfo-main
- `www.gandolfo.app` → gandolfo-main

### Configuración Nueva:
- `gandolfo.app` → gandolfo-main (app principal)
- `web.gandolfo.app` → gandolfo-web (app web)
- O configurar proxy desde `/web/*` → gandolfo-web

## 📝 Variables de Entorno a Migrar

### Desde gandolfo-resto-system-1:
```bash
# Copiar estas variables al nuevo servicio:
NODE_ENV=production
SENDGRID_API_KEY=...
FROM_EMAIL=...
DATABASE_URL=...
# (todas las variables actuales)
```

### Nuevas para gandolfo-web:
```bash
NODE_ENV=production
PORT=10001
VITE_API_URL=https://gandolfo-main.onrender.com/api
VITE_APP_URL=https://gandolfo-web.onrender.com
```

## ✅ Checklist de Migración

- [ ] Backup de variables de entorno actuales
- [ ] Crear gandolfo-web service nuevo
- [ ] Probar que gandolfo-web funcione
- [ ] Migrar gandolfo-resto-system-1 → gandolfo-main
- [ ] Configurar dominios
- [ ] Probar integración completa
- [ ] Eliminar servicios antiguos (opcional)

## 🆘 Plan de Rollback

Si algo falla:
1. Revertir repository en Render a `gandolfo-resto-system-1`
2. Mantener gandolfo-web independiente temporalmente
3. Debuggear y reintentar

## 📞 Comandos Útiles

```bash
# Actualizar subtree
cd gandolfo-app
git subtree pull --prefix=web origin-web main --squash

# Deploy cambios
git add . && git commit -m "Update" && git push

# Verificar status local
npm run dev:main    # App principal en :4000
npm run dev:web     # App web en :3001
```
