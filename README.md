# Sistema de Talleres y Cursos — FES Acatlán

Plataforma web para la gestión, consulta e inscripción a talleres y cursos de la Facultad de Estudios Superiores Acatlán (FES Acatlán), desarrollada como un sistema web moderno con una arquitectura separada entre frontend, backend y base de datos.

## Descripción

El proyecto tiene como objetivo proporcionar una plataforma centralizada para la publicación y gestión de talleres y cursos, permitiendo a los usuarios consultar la oferta disponible, registrarse, iniciar sesión e inscribirse en las actividades disponibles.

El sistema contempla diferentes roles de usuario:

- **Alumno:** consulta talleres, administra su información e inscripciones y puede acceder a sus certificados.
- **Instructor:** administra la información relacionada con los talleres que imparte.
- **Administrador:** gestiona usuarios, talleres, instructores y demás información del sistema.

La aplicación fue desarrollada siguiendo una arquitectura cliente-servidor, separando la interfaz de usuario, la lógica de negocio y la persistencia de datos.

---

## Arquitectura

La aplicación está compuesta por tres componentes principales:

```text
                         INTERNET
                            │
                            ▼
                 ┌─────────────────────┐
                 │       VERCEL        │
                 │                     │
                 │ Next.js + React     │
                 │ TypeScript          │
                 │ Tailwind CSS        │
                 │                     │
                 │     FRONTEND        │
                 └──────────┬──────────┘
                            │
                           HTTPS
                            │ REST API
                            ▼
                 ┌─────────────────────┐
                 │      RAILWAY        │
                 │                     │
                 │ FastAPI             │
                 │ Python              │
                 │ Uvicorn             │
                 │                     │
                 │      BACKEND        │
                 └──────────┬──────────┘
                            │
                       PostgreSQL
                            │
                            ▼
                 ┌─────────────────────┐
                 │      SUPABASE       │
                 │                     │
                 │    PostgreSQL       │
                 │                     │
                 │     DATABASE        │
                 └─────────────────────┘
```

El frontend se comunica con el backend mediante una API REST sobre HTTPS. El backend se encarga de la lógica de negocio, autenticación y acceso a la base de datos.

---

## Tecnologías utilizadas

### Frontend

- **Next.js** — Framework de React para el desarrollo de la aplicación web.
- **React** — Construcción de interfaces mediante componentes.
- **TypeScript** — Tipado estático y mayor seguridad durante el desarrollo.
- **Tailwind CSS** — Diseño y estilos de la interfaz.
- **Next.js App Router** — Organización de rutas y páginas.
- **Fetch API** — Comunicación con el backend.

### Backend

El frontend consume una API desarrollada con:

- **Python**
- **FastAPI**
- **Uvicorn**
- **asyncpg**
- **PostgreSQL**
- **JWT** para autenticación.

Repositorio del backend:

**Talleres-Cursos API**

https://github.com/SadLib/back-FastAPI

### Base de datos

La aplicación utiliza **PostgreSQL** como sistema gestor de bases de datos.

En producción, la base de datos se encuentra administrada mediante **Supabase**.

El modelo de datos contempla entidades relacionadas con:

- Usuarios
- Roles
- Alumnos
- Instructores
- Carreras
- Talleres
- Talleres e instructores
- Temarios
- Inscripciones
- Certificados

---

## Funcionalidades principales

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Protección de endpoints.
- Control de acceso mediante roles.

### Gestión de talleres

- Consulta de talleres disponibles.
- Visualización de información detallada.
- Gestión de talleres mediante los roles autorizados.
- Asociación de instructores.
- Gestión del temario.

### Alumnos

- Registro de información del alumno.
- Consulta de talleres.
- Inscripción a talleres.
- Consulta de inscripciones.
- Consulta de certificados.

### Instructores

- Gestión de información del instructor.
- Administración de talleres asociados.
- Gestión de información relacionada con los cursos impartidos.

### Administración

El sistema contempla un área administrativa para la gestión de:

- Usuarios.
- Roles.
- Talleres.
- Instructores.
- Alumnos.
- Inscripciones.
- Información académica.

### Certificados

El sistema contempla la generación de certificados para los alumnos que cumplen con las condiciones correspondientes de participación en los talleres.

---

## Estructura del proyecto

El frontend utiliza el sistema de rutas basado en **App Router** de Next.js.

Una estructura simplificada del proyecto es:

```text
servicio/
│
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── courses/
│   │   └── [id]/
│   │
│   ├── dashboard/
│   │   ├── profile/
│   │   └── instructor/
│   │
│   ├── components/
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── .env.local
```

La estructura permite separar las diferentes áreas de la aplicación y mantener una organización modular del código.

---

## Instalación y ejecución local

### Requisitos

- Node.js 18 o superior.
- npm.
- Git.

Clonar el repositorio:

```bash
git clone https://github.com/SadLib/Talleres-Cursos.git
```

Entrar al proyecto:

```bash
cd Talleres-Cursos
```

Instalar las dependencias:

```bash
npm install
```

### Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Esta variable indica al frontend la dirección de la API que debe consumir durante el desarrollo.

### Ejecutar el proyecto

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

> Para utilizar todas las funcionalidades del sistema durante el desarrollo, el backend FastAPI también debe estar ejecutándose.

---

## Configuración de producción

El frontend está desplegado en **Vercel** y utiliza la API desplegada en **Railway**.

En producción, la variable:

```env
NEXT_PUBLIC_API_URL
```

se configura como:

```text
https://backendtallerescursos-production.up.railway.app/api
```

Las variables de entorno de producción se configuran directamente desde la plataforma de despliegue y no se almacenan en el repositorio.

---

## Aplicación en producción

### Frontend

La aplicación está disponible en:

https://talleres-cursos.vercel.app

### Backend

La API está disponible en:

https://backendtallerescursos-production.up.railway.app

### Documentación de la API

FastAPI proporciona documentación interactiva mediante Swagger UI:

https://backendtallerescursos-production.up.railway.app/docs

### Health Check

El backend dispone de un endpoint para comprobar el estado del servicio:

```text
GET /api/health
```

Disponible en:

https://backendtallerescursos-production.up.railway.app/api/health

Respuesta esperada:

```json
{
  "status": "ok"
}
```

---

## Variables de entorno y seguridad

Las variables de entorno permiten separar la configuración del código fuente.

Este proyecto no almacena en GitHub:

- Contraseñas de la base de datos.
- Claves secretas para JWT.
- Archivos `.env`.
- Credenciales de servicios externos.

El repositorio únicamente puede incluir archivos de ejemplo como `.env.example`, sin valores sensibles.

---

## Flujo general de la aplicación

El funcionamiento general del sistema sigue el siguiente flujo:

```text
Usuario
   │
   ▼
Frontend Next.js
   │
   │ HTTP / HTTPS
   ▼
API REST
   │
   ▼
FastAPI
   │
   ├── Autenticación
   ├── Autorización
   ├── Lógica de negocio
   └── Validación
   │
   ▼
PostgreSQL
   │
   ▼
Respuesta
   │
   ▼
Frontend
   │
   ▼
Usuario
```

---

## Desarrollo y despliegue

El proyecto fue desarrollado utilizando Git y GitHub como herramientas para el control de versiones.

El flujo utilizado es:

```text
Desarrollo local
       │
       ▼
      Git
       │
       ▼
    GitHub
       │
       ├──────────────► Vercel
       │                 Frontend
       │
       └──────────────► Railway
                         Backend
                              │
                              ▼
                         Supabase
                         PostgreSQL
```

Esto permite mantener separado el código fuente del frontend y backend, además de facilitar la actualización de las aplicaciones desplegadas.

---

## Estado del proyecto

El sistema cuenta con:

- Frontend desarrollado con Next.js.
- Backend desarrollado con FastAPI.
- API REST funcional.
- Base de datos PostgreSQL.
- Autenticación mediante JWT.
- Control de acceso basado en roles.
- Integración entre frontend y backend.
- Despliegue del frontend en Vercel.
- Despliegue del backend en Railway.
- Base de datos de producción en Supabase.
- Variables de entorno para la configuración de los servicios.
- Endpoint de comprobación de disponibilidad de la API.

---

## Documentación

La documentación detallada del desarrollo, instalación, arquitectura, base de datos, autenticación, pruebas y despliegue se encuentra en el **Manual de Construcción del Sistema de Talleres y Cursos — FES Acatlán**.

---

## Autor

**Sadrach Neftali Libonatti Valdivia**

Proyecto académico — FES Acatlán, UNAM.

---

## Licencia

Este proyecto fue desarrollado con fines académicos.
