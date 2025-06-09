import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Servir aplicación web en /web/*
app.use('/web', express.static(join(__dirname, 'web/dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Gandolfo App Main Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes principales
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Gandolfo App',
    description: 'Sistema principal de reservas para restaurantes',
    endpoints: {
      health: '/api/health',
      info: '/api/info',
      web: '/web (Git Subtree)'
    }
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a Gandolfo App',
    description: 'Sistema unificado de reservas para restaurantes',
    services: {
      main: 'Aplicación principal en /',
      web: 'Aplicación web en /web/'
    },
    status: 'running'
  });
});

// Catch-all para aplicación web en /web/*
app.get('/web/*', (req, res) => {
  res.sendFile(join(__dirname, 'web/dist/index.html'));
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: 'Verifica la URL solicitada',
    availableEndpoints: [
      '/',
      '/api/health',
      '/api/info',
      '/web/ (será agregado via Git Subtree)'
    ]
  });
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Gandolfo App Main Server running on port ${PORT}`);
  console.log(`📱 Access at: http://localhost:${PORT}`);
  console.log(`🌐 Web app will be available at: http://localhost:${PORT}/web (after subtree setup)`);
});

export default app;
