# Gandolfo App - Aplicación Principal Unificada

Sistema completo de reservas para restaurantes, unificando la aplicación principal y la interfaz web.

## Arquitectura

```
gandolfo-app/
├── / (Aplicación principal)
└── web/ (Aplicación web - Git Subtree)
```

## Deploy en Render

### Servicios:
- **gandolfo-main**: Aplicación principal en `gandolfo.app`
- **gandolfo-web**: Aplicación web en `gandolfo.app/web/` o `web.gandolfo.app`

### Configuración:
1. Servicio principal: Root directory `/`
2. Servicio web: Root directory `/web`

## Comandos Git Subtree

```bash
# Actualizar subtree web
git subtree pull --prefix=web https://github.com/hernanbl/gandolfowebapp.git main --squash

# Enviar cambios al repo web
git subtree push --prefix=web https://github.com/hernanbl/gandolfowebapp.git main
```

## Variables de Entorno

Ver documentación en `/web/DEPLOY_GUIDE.md` para configuración completa.

## Desarrollo

### Aplicación principal:
```bash
# Desarrollo de la app principal
npm run dev
```

### Aplicación web:
```bash
cd web
npm run dev
```

## Deploy

Ambas aplicaciones se despliegan automáticamente en Render desde este repositorio unificado.
