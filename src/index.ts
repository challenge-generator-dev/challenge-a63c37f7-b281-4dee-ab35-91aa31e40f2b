import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { HttpException } from './exceptions/http.exception';

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'TechStore API - Catálogo de Productos',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      health: '/health'
    }
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/products', productRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error no manejado:', err);
  
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      statusCode: err.statusCode
    });
  }
  
  return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    statusCode: 500
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    statusCode: 404
  });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📋 Endpoints de productos disponibles en http://localhost:${PORT}/api/products`);
  console.log(`🔧 Health check disponible en http://localhost:${PORT}/health`);
});

process.on('SIGTERM', () => {
  console.log('📦 Señal SIGTERM recibida, cerrando servidor gracefully...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📦 Señal SIGINT recibida, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

export default app;