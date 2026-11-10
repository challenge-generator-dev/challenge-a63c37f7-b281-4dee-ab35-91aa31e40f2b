# Desarrollo de API REST para Catálogo de Productos

La empresa de venta de productos tecnológicos 'TechStore' requiere una API REST para gestionar su catálogo de productos. La API debe soportar la creación, lectura, actualización y eliminación de productos, con validación de entradas y manejo centralizado de errores. Los productos tienen atributos como nombre, precio, descripción y categoría. La validación debe asegurar que los nombres de productos no se dupliquen y que los precios sean valores positivos. El manejo de errores debe ser robusto y proporcionar respuestas claras para diferentes tipos de fallos, como errores de validación o problemas de acceso a la base de datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración y Creación de Endpoints Básicos

**Objetivo:** Configurar el entorno y crear los endpoints básicos para CRUD de productos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto con Node y Express.
- Crear endpoints para listar todos los productos, obtener un producto por ID, crear un nuevo producto, actualizar un producto existente y eliminar un producto.

**Entregable:** Proyecto configurado con endpoints básicos funcionales.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de la configuración del entorno de desarrollo.
- Uso de rutas y métodos HTTP en Express.

</details>

### Fase 2: Implementación de Validación y Manejo de Errores

**Objetivo:** Implementar la validación de entradas y el manejo centralizado de errores en los endpoints.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Agregar validación para asegurar que los nombres de productos no se dupliquen y que los precios sean valores positivos.
- Implementar un middleware para manejar errores de manera centralizada, proporcionando respuestas claras para diferentes tipos de fallos.

**Entregable:** Endpoints con validación de entradas y manejo centralizado de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Técnicas de validación de datos en Express.
- Uso de middlewares para manejar errores.

</details>

### Fase 3: Refactorización y Optimización

**Objetivo:** Refactorizar el código para mejorar su estructura y rendimiento, y considerar posibles optimizaciones.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Refactorizar el código para mejorar su legibilidad y mantenibilidad.
- Considerar y aplicar posibles optimizaciones para mejorar el rendimiento de la API.

**Entregable:** Código refactorizado y optimizado para la API.

<details>
<summary>Pistas de conocimiento</summary>

- Principios de refactorización y buenas prácticas de codificación.
- Técnicas de optimización de rendimiento en aplicaciones web.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los endpoints REST y cómo se utilizan en una API?
- **paraQueSirve**: ¿Para qué sirve la validación de entradas en una API REST?
- **comoSeUsa**: ¿Cómo se implementa el manejo centralizado de errores en Express?
- **erroresComunes**: ¿Cuáles son los errores comunes al crear endpoints REST y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la refactorización y optimización del código en una API REST?

## Criterios de Evaluacion

- Configuración correcta del proyecto con Node y Express.
- Creación de endpoints básicos funcionales para CRUD de productos.
- Implementación de validación de entradas y manejo centralizado de errores.
- Refactorización y optimización del código para mejorar estructura y rendimiento.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
