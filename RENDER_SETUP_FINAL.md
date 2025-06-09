# 🎯 RENDER: Configuración para gandolfo.app/web/

## 📋 LO QUE FALTA EN RENDER (Pasos Específicos)

### ✅ **LO QUE YA TIENES:**
- `gandolfo.app` funcionando desde `gandolfo-resto-system-1`
- Repositorio `gandolfo-app` con subtree configurado
- Código listo para `gandolfo.app/web/`

### 🚀 **LO QUE NECESITAS HACER EN RENDER:**

#### **OPCIÓN 1: Solo agregar /web/ al servicio existente (Más Simple)**

1. **Cambiar repositorio del servicio actual:**
   ```
   Render Dashboard → Tu servicio actual → Settings → Repository
   Cambiar de: gandolfo-resto-system-1
   A: hernanbl/gandolfo-app
   ```

2. **Actualizar configuración del servicio:**
   ```yaml
   Build Command: npm install && npm run build
   Start Command: npm start
   Environment Variables: (mantener las actuales)
   ```

3. **¡LISTO!** Tendrás:
   - `gandolfo.app` → App principal
   - `gandolfo.app/web/` → App web

---

#### **OPCIÓN 2: Dos servicios separados (Más Control)**

1. **Mantener servicio actual** (`gandolfo-resto-system-1`)

2. **Crear nuevo servicio para web:**
   ```yaml
   Service Name: gandolfo-web
   Repository: hernanbl/gandolfo-app
   Branch: main
   Root Directory: web
   Build Command: cd web && npm install && npm run build
   Start Command: cd web && npm start
   Environment Variables:
     - NODE_ENV=production
     - PORT=10000
     - BASE_PATH=/web
   ```

3. **Configurar Custom Domain:**
   - `web.gandolfo.app` → gandolfo-web service

---

## 🔧 **CONFIGURACIÓN FINAL EN RENDER**

### Para OPCIÓN 1 (Recomendada):

```yaml
# En tu servicio actual, cambiar a:
Repository: hernanbl/gandolfo-app
Build Command: npm install && npm run build
Start Command: npm start
Custom Domains:
  - gandolfo.app
  - www.gandolfo.app
Environment Variables:
  - NODE_ENV=production
  - PORT=10000
  - (todas tus variables actuales)
```

### Resultado Final:
✅ `https://gandolfo.app` → App principal  
✅ `https://gandolfo.app/web/` → App web integrada  
✅ Mismo dominio, ambas aplicaciones  

---

## 📝 **VARIABLES DE ENTORNO NECESARIAS**

```bash
# Variables existentes (mantener)
NODE_ENV=production
SENDGRID_API_KEY=tu_api_key
FROM_EMAIL=noreply@gandolfo.app
DATABASE_URL=...
# (todas las que ya tienes)

# Nuevas para funcionalidad web
VITE_API_URL=https://gandolfo.app/api
VITE_APP_URL=https://gandolfo.app/web
```

---

## 🎯 **DECISIÓN RECOMENDADA**

**USA OPCIÓN 1** porque:
- ✅ Mantiene el dominio unificado `gandolfo.app`
- ✅ Solo cambias el repositorio
- ✅ Menos complejidad de configuración
- ✅ Un solo servicio en Render
- ✅ `gandolfo.app/web/` funciona automáticamente

---

## 🚨 **PASOS INMEDIATOS**

1. **Backup**: Anota tus variables de entorno actuales
2. **Cambiar**: Repository en Render a `hernanbl/gandolfo-app`
3. **Actualizar**: Build command a `npm install && npm run build`
4. **Deploy**: Render automáticamente hará nuevo deploy
5. **Probar**: `gandolfo.app` y `gandolfo.app/web/`

---

## 🔄 **COMANDOS GIT PARA FUTURO**

```bash
# Para actualizar la app web desde el repo original
cd /Volumes/AUDIO/gandolfo-app
git subtree pull --prefix=web origin-web main --squash
git push

# Render automáticamente detectará cambios y desplegará
```

---

## ✅ **VERIFICACIÓN POST-DEPLOY**

- [ ] `https://gandolfo.app` carga la app principal
- [ ] `https://gandolfo.app/api/health` responde OK
- [ ] `https://gandolfo.app/web/` carga la app web
- [ ] Variables de entorno funcionan
- [ ] SSL activo en ambas rutas
