# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/product.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/repositories/product.repository.ts` — `Product.push`: Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/product.repository.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/product.repository.ts` — `Product.findIndex`: Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/product.repository.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/validation.exception.ts` — `ValidationError.some`: Se invoca `some` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/validation.exception.ts` — `ValidationError.find`: Se invoca `find` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/validation.exception.ts` — `ValidationError.map`: Se invoca `map` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261109223818458), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para Catálogo de Productos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y Creación de Endpoints Básicos — objetivo: Configurar el entorno y crear los endpoints básicos para CRUD de productos. — entregable (NO resolver): Proyecto configurado con endpoints básicos funcionales.
- Fase 2: Implementación de Validación y Manejo de Errores — objetivo: Implementar la validación de entradas y el manejo centralizado de errores en los endpoints. — entregable (NO resolver): Endpoints con validación de entradas y manejo centralizado de errores.
- Fase 3: Refactorización y Optimización — objetivo: Refactorizar el código para mejorar su estructura y rendimiento, y considerar posibles optimizaciones. — entregable (NO resolver): Código refactorizado y optimizado para la API.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "techstore-api",
  "version": "1.0.0",
  "description": "API REST para gestión de catálogo de productos",
  "main": "src/main.ts",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "express-validator": "^7.2.0",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.5.0",
    "@types/supertest": "^6.0.2",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts",
      "js"
    ],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testMatch": [
      "**/tests/**/*.test.ts"
    ]
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}

// === ARCHIVO: src/main.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { ErrorMiddleware } from './middlewares/error.middleware';

dotenv.config();

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use('/api/products', productRoutes);
    
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'UP' });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      ErrorMiddleware.handle(err, req, res, next);
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();

export default server;

// === ARCHIVO: src/models/product.model.ts ===
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class Product {
  @Expose()
  id?: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  @Expose()
  name: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  @Expose()
  price: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
  @Expose()
  description: string;

  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @Expose()
  category: string;

  constructor(
    name: string,
    price: number,
    description: string,
    category: string,
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }
}

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name!: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  price!: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
  description!: string;

  @IsString({ message: ' categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  category!: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  price?: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  category?: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export { generateId };

// === ARCHIVO: src/repositories/product.repository.ts ===
import { Product } from '../models/product.model';

/**
 * Interfaz para el repositorio de productos.
 * Define las operaciones de persistencia para Producto.
 */
export interface IProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    findByName(name: string): Promise<Product | null>;
}

/**
 * Implementación del repositorio de productos.
 * En esta versión inicial, se simula la persistencia en memoria.
 */
export class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    async create(product: Product): Promise<Product> {
        const newProduct = { ...product, id: this.generateId() };
        this.products.push(newProduct);
        return newProduct;
    }

    async findAll(): Promise<Product[]> {
        return [...this.products];
    }

    async findById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id === id) || null;
    }

    async update(id: string, product: Partial<Product>): Promise<Product | null> {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        const updatedProduct = { ...this.products[index], ...product, id };
        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== id);
        return this.products.length !== initialLength;
    }

    async findByName(name: string): Promise<Product | null> {
        return this.products.find(p => p.name === name) || null;
    }

    public generateId(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}

// === ARCHIVO: src/index.ts ===
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

// === ARCHIVO: src/routes/product.routes.ts ===
import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateCreateProduct, validateUpdateProduct } from '../validators/product.validator';

const router: Router = Router();

const productController = new ProductController();

router.post('/', 
  validateCreateProduct, 
  (req: Request, res: Response, next: NextFunction) => {
    productController.createProduct(req, res, next);
  }
);

router.get('/', 
  (req: Request, res: Response, next: NextFunction) => {
    productController.getAllProducts(req, res, next);
  }
);

router.get('/:id', 
  (req: Request, res: Response, next: NextFunction) => {
    productController.getProductById(req, res, next);
  }
);

router.put('/:id', 
  validateUpdateProduct, 
  (req: Request, res: Response, next: NextFunction) => {
    productController.updateProduct(req, res, next);
  }
);

router.delete('/:id', 
  (req: Request, res: Response, next: NextFunction) => {
    productController.deleteProduct(req, res, next);
  }
);

router.options('/', 
  (_req: Request, res: Response) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).send();
  }
);

router.options('/:id', 
  (_req: Request, res: Response) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).send();
  }
);

export default router;

// === ARCHIVO: src/controllers/product.controller.ts ===
import { Request, Response, NextFunction } from 'express';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { HttpException } from '../exceptions/http.exception';

export class ProductController {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, price, description, category } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new ValidationException('El nombre del producto es requerido y debe ser una cadena no vacía');
      }

      if (typeof price !== 'number' || price <= 0) {
        throw new ValidationException('El precio debe ser un número positivo');
      }

      if (description && typeof description !== 'string') {
        throw new ValidationException('La descripción debe ser una cadena de texto');
      }

      if (category && typeof category !== 'string') {
        throw new ValidationException('La categoría debe ser una cadena de texto');
      }

      const existingProduct = await this.productRepository.findByName(name.trim());
      if (existingProduct) {
        throw new ValidationException(`Ya existe un producto con el nombre "${name}"`);
      }

      const createProductDto: CreateProductDto = {
        name: name.trim(),
        price: price,
        description: description ? description.trim() : '',
        category: category ? category.trim() : 'general'
      };

      const newProduct = new Product(
        createProductDto.name,
        createProductDto.price,
        createProductDto.description,
        createProductDto.category,
        this.productRepository.generateId()
      );

      const createdProduct = await this.productRepository.create(newProduct);

      res.status(201).json({
        success: true,
        data: {
          id: createdProduct.id,
          name: createdProduct.name,
          price: createdProduct.price,
          description: createdProduct.description,
          category: createdProduct.category
        },
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productRepository.findAll();

      const productsResponse = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category
      }));

      res.status(200).json({
        success: true,
        data: productsResponse,
        count: productsResponse.length,
        message: productsResponse.length > 0 
          ? `${productsResponse.length} producto(s) encontrado(s)` 
          : 'No hay productos disponibles'
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationException('El ID del producto es requerido');
      }

      const product = await this.productRepository.findById(id.trim());

      if (!product) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      res.status(200).json({
        success: true,
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category
        },
        message: 'Producto encontrado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      const { name, price, description, category } = req.body;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationException('El ID del producto es requerido');
      }

      const trimmedId = id.trim();
      const existingProduct = await this.productRepository.findById(trimmedId);
      if (!existingProduct) {
        throw new NotFoundException(`Producto con ID "${trimmedId}" no encontrado`);
      }

      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0) {
          throw new ValidationException('El nombre del producto debe ser una cadena no vacía');
        }

        const productWithSameName = await this.productRepository.findByName(name.trim());
        if (productWithSameName && productWithSameName.id !== trimmedId) {
          throw new ValidationException(`Ya existe otro producto con el nombre "${name}"`);
        }
      }

      if (price !== undefined) {
        if (typeof price !== 'number' || price <= 0) {
          throw new ValidationException('El precio debe ser un número positivo');
        }
      }

      if (description !== undefined && typeof description !== 'string') {
        throw new ValidationException('La descripción debe ser una cadena de texto');
      }

      if (category !== undefined && typeof category !== 'string') {
        throw new ValidationException('La categoría debe ser una cadena de texto');
      }

      const updateData: UpdateProductDto = {
        name: name ? name.trim() : undefined,
        price: price,
        description: description ? description.trim() : undefined,
        category: category ? category.trim() : undefined
      };

      const updatedProduct = await this.productRepository.update(trimmedId, updateData);

      if (!updatedProduct) {
        throw new NotFoundException(`No se pudo actualizar el producto con ID "${trimmedId}"`);
      }

      res.status(200).json({
        success: true,
        data: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          price: updatedProduct.price,
          description: updatedProduct.description,
          category: updatedProduct.category
        },
        message: 'Producto actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationException('El ID del producto es requerido');
      }

      const trimmedId = id.trim();
      const existingProduct = await this.productRepository.findById(trimmedId);
      if (!existingProduct) {
        throw new NotFoundException(`Producto con ID "${trimmedId}" no encontrado`);
      }

      const deleted = await this.productRepository.delete(trimmedId);

      if (!deleted) {
        throw new HttpException(500, 'Error al eliminar el producto');
      }

      res.status(200).json({
        success: true,
        data: {},
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}

// === ARCHIVO: src/services/product.service.ts ===
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { IProductRepository } from '../repositories/product.repository';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ValidationException } from '../exceptions/validation.exception';

export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async createProduct(dto: CreateProductDto): Promise<Product> {
        const existingProduct = await this.productRepository.findByName(dto.name);
        if (existingProduct) {
            throw new ValidationException('Product with this name already exists');
        }

        if (dto.price <= 0) {
            throw new ValidationException('Price must be a positive value');
        }

        if (!dto.name || dto.name.trim().length === 0) {
            throw new ValidationException('Product name is required');
        }

        if (!dto.category || dto.category.trim().length === 0) {
            throw new ValidationException('Product category is required');
        }

        const product = new Product(
            dto.name.trim(),
            dto.price,
            dto.description?.trim() || '',
            dto.category.trim()
        );

        return await this.productRepository.create(product);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        if (dto.name && dto.name.trim() !== existingProduct.name) {
            const productWithName = await this.productRepository.findByName(dto.name);
            if (productWithName && productWithName.id !== id) {
                throw new ValidationException('Product with this name already exists');
            }
        }

        if (dto.price !== undefined && dto.price <= 0) {
            throw new ValidationException('Price must be a positive value');
        }

        const updateData: Partial<Product> = {};
        if (dto.name) updateData.name = dto.name.trim();
        if (dto.price !== undefined) updateData.price = dto.price;
        if (dto.description !== undefined) updateData.description = dto.description.trim();
        if (dto.category) updateData.category = dto.category.trim();

        const updatedProduct = await this.productRepository.update(id, updateData);
        if (!updatedProduct) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<void> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        const deleted = await this.productRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Failed to delete product with id ${id}`);
        }
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        const allProducts = await this.productRepository.findAll();
        return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    async searchProducts(query: string): Promise<Product[]> {
        const allProducts = await this.productRepository.findAll();
        const lowerQuery = query.toLowerCase();
        return allProducts.filter(
            p => p.name.toLowerCase().includes(lowerQuery) || 
                 p.description.toLowerCase().includes(lowerQuery)
        );
    }
}

// === ARCHIVO: src/middlewares/error.middleware.ts ===
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

export interface ErrorResponse {
    statusCode: number;
    message: string;
    error: string;
    timestamp: string;
    path?: string;
    details?: unknown;
}

export class ErrorMiddleware {
    static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        let errorResponse: ErrorResponse;

        if (err instanceof HttpException) {
            errorResponse = {
                statusCode: err.statusCode,
                message: err.message,
                error: err.name,
                timestamp: new Date().toISOString(),
                path: req.path
            };

            if (err instanceof ValidationException) {
                errorResponse.details = err.getDetails();
            }

            res.status(err.statusCode).json(errorResponse);
            return;
        }

        if (err instanceof Error) {
            errorResponse = {
                statusCode: 500,
                message: process.env.NODE_ENV === 'production' 
                    ? 'Internal server error' 
                    : err.message,
                error: 'InternalServerError',
                timestamp: new Date().toISOString(),
                path: req.path
            };

            if (process.env.NODE_ENV !== 'production') {
                errorResponse.details = {
                    name: err.name,
                    stack: err.stack
                };
            }

            res.status(500).json(errorResponse);
            return;
        }

        errorResponse = {
            statusCode: 500,
            message: 'Unknown error occurred',
            error: 'UnknownError',
            timestamp: new Date().toISOString(),
            path: req.path
        };

        res.status(500).json(errorResponse);
    }

    static notFoundHandler(req: Request, res: Response): void {
        res.status(404).json({
            statusCode: 404,
            message: `Route ${req.method} ${req.path} not found`,
            error: 'NotFound',
            timestamp: new Date().toISOString(),
            path: req.path
        });
    }

    static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}

// === ARCHIVO: src/validators/product.validator.ts ===
import { body, param, query, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationException } from '../exceptions/validation.exception';

export const createProductValidationRules: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Product name must be between 2 and 100 characters'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number greater than 0'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Product category is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category must be between 2 and 50 characters')
];

export const updateProductValidationRules: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID'),
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Product name cannot be empty')
        .isLength({ min: 2, max: 100 })
        .withMessage('Product name must be between 2 and 100 characters'),
    body('price')
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number greater than 0'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category must be between 2 and 50 characters')
];

export const getProductByIdValidationRules: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID')
];

export const deleteProductValidationRules: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID')
];

export const getProductsValidationRules: ValidationChain[] = [
    query('category')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Category filter must be between 2 and 50 characters'),
    query('search')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search query must be between 1 and 100 characters'),
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be a non-negative number'),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be a non-negative number'),
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];

export const productIdParamValidation = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID')
];

export const validateCreateProduct = [
    ...createProductValidationRules,
    (req: Request, _res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                field: 'path' in err ? err.path : 'unknown',
                message: err.msg,
                value: 'path' in err ? req.body[err.path as keyof typeof req.body] : undefined
            }));
            throw ValidationException.fromExpressValidatorErrors(formattedErrors as any);
        }
        next();
    }
];

export const validateUpdateProduct = [
    ...updateProductValidationRules,
    (req: Request, _res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                field: 'path' in err ? err.path : 'unknown',
                message: err.msg,
                value: 'path' in err ? req.body[err.path as keyof typeof req.body] : undefined
            }));
            throw ValidationException.fromExpressValidatorErrors(formattedErrors as any);
        }
        next();
    }
];

// === ARCHIVO: src/exceptions/http.exception.ts ===
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

export abstract class HttpException extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly timestamp: string;
  public readonly path?: string;

  constructor(
    message: string,
    statusCode: HttpStatusCode,
    isOperational: boolean = true,
    path?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      timestamp: this.timestamp,
      ...(this.path && { path: this.path })
    };
  }

  public getHttpResponse(): { status: number; body: Record<string, unknown> } {
    return {
      status: this.statusCode,
      body: this.toJSON()
    };
  }

  protected static validateStatusCode(statusCode: number): boolean {
    return statusCode >= 100 && statusCode < 600;
  }

  protected static formatMessage(message: string, defaultMessage: string): string {
    return message && message.trim().length > 0 ? message : defaultMessage;
  }
}

// === ARCHIVO: src/exceptions/validation.exception.ts ===
import { HttpException, HttpStatusCode } from './http.exception';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationExceptionDetails {
  errors: ValidationError[];
  errorCount: number;
}

export class ValidationException extends HttpException {
  public readonly errors: ValidationError[];
  public readonly errorCount: number;

  constructor(
    message: string = 'Validation failed',
    errors: ValidationError[] = [],
    statusCode: HttpStatusCode = HttpStatusCode.UNPROCESSABLE_ENTITY
  ) {
    const formattedMessage = HttpException.formatMessage(message, 'Validation failed');
    super(formattedMessage, statusCode, true);
    this.name = 'ValidationException';
    this.errors = errors;
    this.errorCount = errors.length;
  }

  public get details(): ValidationExceptionDetails {
    return {
      errors: this.errors,
      errorCount: this.errorCount
    };
  }

  public static fromSingleError(field: string, errorMessage: string, value?: unknown): ValidationException {
    return new ValidationException(
      'Validation failed',
      [{ field, message: errorMessage, value }]
    );
  }

  public static fromMultipleErrors(errors: ValidationError[]): ValidationException {
    return new ValidationException(
      `Validation failed: ${errors.length} error(s) found`,
      errors
    );
  }

  public static fromExpressValidatorErrors(validationErrors: Array<{ path: string; msg: string }>): ValidationException {
    const formattedErrors: ValidationError[] = validationErrors.map(error => ({
      field: error.path,
      message: error.msg
    }));
    return ValidationException.fromMultipleErrors(formattedErrors);
  }

  public hasError(field: string): boolean {
    return this.errors.some(error => error.field === field);
  }

  public getError(field: string): ValidationError | undefined {
    return this.errors.find(error => error.field === field);
  }

  public getFieldErrors(): string[] {
    return this.errors.map(error => `${error.field}: ${error.message}`);
  }

  public getErrorMessages(): string[] {
    return this.errors.map(error => error.message);
  }

  public getFields(): string[] {
    return this.errors.map(error => error.field);
  }

  public getDetails(): ValidationExceptionDetails {
    return {
      errors: this.errors,
      errorCount: this.errorCount
    };
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      errors: this.errors,
      errorCount: this.errorCount
    };
  }
}

// === ARCHIVO: src/exceptions/not-found.exception.ts ===
import { HttpException, HttpStatusCode } from './http.exception';

export interface NotFoundDetails {
  resource: string;
  identifier: string;
  identifierType: 'id' | 'name' | 'slug' | 'email' | 'username' | 'custom';
  suggestion?: string;
}

export class NotFoundException extends HttpException {
  public readonly resource: string;
  public readonly identifier: string;
  public readonly identifierType: NotFoundDetails['identifierType'];
  public readonly suggestion?: string;

  constructor(
    resource: string,
    identifier: string,
    identifierType: NotFoundDetails['identifierType'] = 'id',
    message?: string,
    suggestion?: string
  ) {
    const defaultMessage = `${resource} with ${identifierType} '${identifier}' not found`;
    const formattedMessage = HttpException.formatMessage(message || '', defaultMessage);
    super(formattedMessage, HttpStatusCode.NOT_FOUND, true);
    this.resource = resource;
    this.identifier = identifier;
    this.identifierType = identifierType;
    this.suggestion = suggestion;
  }

  public static forProduct(id: string): NotFoundException {
    return new NotFoundException('Product', id, 'id');
  }

  public static forProductByName(name: string): NotFoundException {
    return new NotFoundException('Product', name, 'name', undefined, 'Try using a different product name');
  }

  public static forResource(resource: string, identifier: string): NotFoundException {
    return new NotFoundException(resource, identifier, 'id');
  }

  public toJSON(): Record<string, unknown> {
    const base = super.toJSON();
    return {
      ...base,
      resource: this.resource,
      identifier: this.identifier,
      identifierType: this.identifierType,
      ...(this.suggestion && { suggestion: this.suggestion })
    };
  }

  public getDetails(): NotFoundDetails {
    return {
      resource: this.resource,
      identifier: this.identifier,
      identifierType: this.identifierType,
      ...(this.suggestion && { suggestion: this.suggestion })
    };
  }

  public static isNotFoundError(error: unknown): boolean {
    return error instanceof NotFoundException;
  }
}

// === ARCHIVO: src/utils/db.ts ===
import dotenv from 'dotenv';

dotenv.config();

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface ConnectionStatus {
  connected: boolean;
  timestamp: Date;
  database: string;
}

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private config: DatabaseConfig;
  private isConnected: boolean = false;
  private connectionTimestamp: Date | null = null;

  private constructor() {
    this.config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME || 'techstore',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres'
    };
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Ya existe una conexión activa a la base de datos');
      return;
    }

    try {
      console.log(`Conectando a la base de datos: ${this.config.database} en ${this.config.host}:${this.config.port}`);
      
      await this.simulateConnection();
      
      this.isConnected = true;
      this.connectionTimestamp = new Date();
      console.log('Conexión a la base de datos establecida exitosamente');
    } catch (error) {
      this.isConnected = false;
      throw new Error(`Error al conectar con la base de datos: ${(error as Error).message}`);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log('No hay conexión activa para cerrar');
      return;
    }

    try {
      await this.simulateDisconnect();
      this.isConnected = false;
      this.connectionTimestamp = null;
      console.log('Conexión a la base de datos cerrada correctamente');
    } catch (error) {
      throw new Error(`Error al cerrar la conexión: ${(error as Error).message}`);
    }
  }

  public getStatus(): ConnectionStatus {
    return {
      connected: this.isConnected,
      timestamp: this.connectionTimestamp || new Date(0),
      database: this.config.database
    };
  }

  public isHealthy(): boolean {
    return this.isConnected;
  }

  private async simulateConnection(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private async simulateDisconnect(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  public getConfig(): DatabaseConfig {
    return { ...this.config };
  }

  public getConnectionString(): string {
    const { user, password, host, port, database } = this.config;
    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }
}

export const db = DatabaseConnection.getInstance();

// === ARCHIVO: tests/product.test.ts ===
import request from 'supertest';
import { Application } from 'express';

describe('ProductController', () => {
  let app: Application;

  beforeAll(() => {
    
  });

  afterAll(() => {
    
  });

  describe('GET /api/products', () => {
    it('debería retornar todos los productos', async () => {
      
    });

    it('debería manejar errores de base de datos', async () => {
      
    });
  });

  describe('GET /api/products/:id', () => {
    it('debería retornar un producto por id', async () => {
      
    });

    it('debería retornar 404 si el producto no existe', async () => {
      
    });
  });

  describe('POST /api/products', () => {
    it('debería crear un nuevo producto', async () => {
      
    });

    it('debería validar que el nombre no esté duplicado', async () => {
      
    });

    it('debería validar que el precio sea positivo', async () => {
      
    });

    it('debería retornar error de validación para datos inválidos', async () => {
      
    });
  });

  describe('PUT /api/products/:id', () => {
    it('debería actualizar un producto existente', async () => {
      
    });

    it('debería retornar 404 si el producto no existe', async () => {
      
    });

    it('debería validar que el nombre no esté duplicado en actualización', async () => {
      
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('debería eliminar un producto existente', async () => {
      
    });

    it('debería retornar 404 si el producto no existe', async () => {
      
    });
  });
});
```
