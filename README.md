# MediScanAI · Hackathon 2026

MediScanAI es una aplicación web para apoyo en el análisis de imágenes médicas con inteligencia artificial.

## ¿Qué hace?

- Permite autenticación de usuarios.
- Recibe imágenes y genera un análisis asistido por IA.
- Guarda historial de análisis para seguimiento.
- Incluye un flujo de comparación evolutiva entre imágenes.

> Importante: la plataforma está orientada a soporte informativo y no reemplaza el criterio médico profesional.

## Arquitectura (alto nivel)

El proyecto está organizado como monorepo con dos módulos principales:

- `frontend/`: interfaz web.
- `backend/`: API, lógica de negocio e integración con servicios externos.

## Requisitos

- Node.js y npm
- Go
- Base de datos PostgreSQL
- Credenciales de servicios externos (IA y almacenamiento de imágenes)

## Ejecución local

### 1) Clonar

```bash
git clone <url-del-repositorio>
cd hack-tech4future
```

### 2) Backend

```bash
cd backend
go mod tidy
go run .\main.go
```

### 3) Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

## Configuración

El backend requiere un archivo de entorno local (`backend/.env`) con:

- Datos de conexión a base de datos.
- Clave para autenticación.
- Clave del proveedor de IA.
- Credenciales del proveedor de almacenamiento de imágenes.

No publiques credenciales reales ni tokens en el repositorio.

## Estructura del repositorio

```text
hack-tech4future/
├── backend/
├── frontend/
└── README.md
```

## Estado del proyecto

Proyecto desarrollado en contexto de hackathon. El código evoluciona rápidamente y puede incluir cambios frecuentes en funcionalidades o interfaz.

## Seguridad y publicación

- Mantener secretos fuera del control de versiones.
- Usar variables de entorno por ambiente.
- Revisar configuración de CORS y autenticación antes de producción.
- Evitar subir datos sensibles o imágenes reales de pacientes en entornos de prueba.
