# Sistema Web de Turismo

Prototipo funcional desarrollado por el **Grupo G2** aplicando la metodología ágil Scrum (Jira + Confluence), para la materia de Metodologías de Desarrollo de Software. Permite gestionar destinos turísticos, paquetes, reservas, turistas, pagos y reportes administrativos desde una plataforma web centralizada.

## Integrantes

| Integrante | Rol |
|---|---|
| Klever López | Scrum Master |
| Raúl Pérez | Developer |
| Ángeles Zambrano | Developer |
| Alisson Arámbulo | Developer |

## Descripción del proyecto

El sistema permite a una agencia de turismo gestionar de forma centralizada todo el flujo de negocio: desde la publicación de destinos y paquetes, hasta el registro de turistas, la creación de reservas, el procesamiento de pagos y la generación de reportes con métricas clave del negocio.

Se implementó siguiendo una arquitectura modular en el backend, con separación clara de responsabilidades por dominio funcional, y una interfaz frontend tipo SPA (Single Page Application) que consume la API mediante `fetch`.

## Funcionalidades principales

- **Autenticación de usuarios**: registro, inicio y cierre de sesión mediante tokens, con contraseñas protegidas por hash (bcrypt).
- **Gestión de destinos**: creación, listado, edición y eliminación de destinos turísticos.
- **Gestión de paquetes**: administración de paquetes turísticos asociados a destinos, con control de cupos disponibles.
- **Gestión de turistas**: registro y administración de la información de los clientes.
- **Reservas**: creación de reservas con validación automática de disponibilidad de cupos, actualización de estado y cancelación controlada.
- **Pagos**: procesamiento de pagos asociados a una reserva, con generación automática de número de factura.
- **Reportes y dashboard**: cálculo de métricas en tiempo real como total de reservas, ingresos totales, y paquete más reservado.

## Tecnologías

- **Backend:** Node.js + Express
- **Frontend:** HTML, JavaScript (vanilla) + Bootstrap 5
- **Autenticación:** Tokens en memoria + contraseñas encriptadas con `bcryptjs`
- **Persistencia:** en memoria (arreglos de JavaScript), pensado como prototipo funcional ágil de rápida iteración
- **Pruebas:** Jest

## Arquitectura del proyecto

El backend sigue una arquitectura por capas simplificada:

- **Capa de rutas (`app.js`)**: expone los endpoints REST y gestiona las peticiones HTTP.
- **Capa de lógica de negocio (`src/*.js`)**: contiene las reglas de negocio de cada dominio (validaciones, cálculos, manejo de estado).
- **Middleware de autenticación**: protege las rutas administrativas verificando la validez del token del usuario.

Esta separación permite que cada módulo pueda probarse y modificarse de forma independiente, sin afectar al resto del sistema — facilitando además el trabajo distribuido entre los integrantes del equipo durante los sprints.

## Estructura del proyecto

```
sistema-turismo/
├── public/
│   └── index.html          # Frontend (SPA simple con fetch al backend)
├── src/
│   ├── auth.js              # Login, logout, registro y verificación de tokens
│   ├── destinos.js          # CRUD de destinos turísticos
│   ├── paquetes.js          # CRUD de paquetes turísticos
│   ├── turistas.js          # CRUD de turistas
│   ├── reservas.js          # Registro, confirmación y cancelación de reservas
│   ├── pagos.js             # Procesamiento de pagos y numeración de facturas
│   ├── reportes.js          # Cálculo de métricas para el dashboard
│   └── *.test.js            # Pruebas unitarias de cada módulo
├── app.js                   # Definición de rutas Express y middleware de autenticación
├── package.json
└── README.md
```

## Módulos funcionales (épicas)

| Épica | Descripción |
|---|---|
| EP01 – Gestión de Destinos Turísticos | Registrar, listar, ver detalle, actualizar y eliminar destinos |
| EP02 – Gestión de Paquetes y Reservas | Crear paquetes, reservar (con validación de cupos), cancelar reservas |
| EP03 – Gestión de Usuarios y Turistas | Registrar, consultar y actualizar turistas |
| EP04 – Pagos y Facturación | Procesar pagos y generar número de factura |
| EP05 – Panel Administrativo y Reportes | Dashboard con métricas generales del negocio |
| EP06 – Seguridad y Acceso | Iniciar y cerrar sesión, rutas administrativas protegidas por token |

## Flujo de negocio implementado

1. Se registra un **destino** turístico.
2. Se crea un **paquete** asociado a ese destino, definiendo precio y cupos disponibles.
3. Se registra un **turista** en el sistema.
4. El turista realiza una **reserva** sobre un paquete, validando automáticamente la disponibilidad de cupos.
5. Se **procesa el pago** de la reserva, generando una factura si el pago es aprobado.
6. El sistema actualiza en tiempo real el **dashboard de reportes** con las métricas del negocio.

## Endpoints principales de la API

| Método | Ruta | Descripción | Requiere sesión |
|---|---|---|---|
| GET | `/destinos` | Listar destinos | No |
| POST | `/destinos` | Registrar destino | Sí |
| PUT | `/destinos/:id` | Actualizar destino | Sí |
| DELETE | `/destinos/:id` | Eliminar destino | Sí |
| GET | `/paquetes` | Listar paquetes | No |
| POST | `/paquetes` | Registrar paquete | Sí |
| PUT | `/paquetes/:id` | Actualizar paquete | Sí |
| DELETE | `/paquetes/:id` | Eliminar paquete | Sí |
| GET | `/turistas` | Listar turistas | No |
| POST | `/turistas` | Registrar turista | No |
| PUT | `/turistas/:id` | Actualizar turista | No |
| DELETE | `/turistas/:id` | Eliminar turista | Sí |
| GET | `/reservas` | Listar reservas | No |
| POST | `/reservas` | Registrar reserva | No |
| PUT | `/reservas/:id` | Actualizar/confirmar reserva | No |
| DELETE | `/reservas/:id` | Cancelar reserva | No |
| GET | `/pagos` | Listar pagos | No |
| POST | `/pagos` | Procesar pago | No |
| POST | `/login` | Iniciar sesión | No |
| POST | `/logout` | Cerrar sesión | Sí |
| GET | `/reportes/resumen` | Obtener métricas del dashboard | No |

## Pruebas unitarias

Cada módulo de negocio (`destinos`, `paquetes`, `turistas`, `reservas`, `pagos`, `reportes`, `auth`) cuenta con su propio archivo de pruebas en Jest, cubriendo tanto los casos de uso principales como escenarios límite (por ejemplo, búsquedas de identificadores inexistentes). Esto permite verificar el correcto funcionamiento de la lógica de negocio de forma aislada, antes de su integración en la API.

Para ejecutar las pruebas:

```bash
npm test
```

## Requisitos previos

- Node.js instalado (v16 o superior recomendado)
- npm

## Instalación

```bash
git clone <url-del-repositorio>
cd sistema-turismo
npm install
```

## Ejecución

```bash
npm start
```

El servidor levanta en **http://localhost:3000**, y desde ahí mismo se sirve el frontend (`public/index.html`).

> ⚠️ Importante: abre la aplicación en el navegador entrando a `http://localhost:3000`, **no** abras el archivo `index.html` haciendo doble clic, o las peticiones al backend pueden fallar por CORS.

## Datos precargados

Al iniciar el servidor ya existen datos de ejemplo para poder revisar el sistema sin tener que registrar todo desde cero:

- 4 destinos turísticos
- 4 paquetes turísticos (con cupos ya ajustados según las reservas de ejemplo)
- 3 turistas
- 3 reservas (2 confirmadas, 1 pendiente)
- 2 pagos aprobados con número de factura

> Estos datos viven en memoria: si detienes el servidor (`Ctrl + C`) o lo reinicias, todo vuelve a este estado inicial. Cualquier cambio hecho durante una sesión (agregar, editar, eliminar) se pierde al reiniciar, ya que no hay base de datos ni archivo de persistencia — comportamiento esperado en esta etapa del prototipo.

## Credenciales de acceso (demo precargada)

| Rol | Email | Password |
|---|---|---|
| Administrador | `admin@turismo.com` | `admin123` |

> Estas credenciales son de un usuario administrador precargado, disponibles únicamente para fines de revisión y evaluación del prototipo.

El login es necesario para **registrar, editar o eliminar destinos y paquetes**. Consultar destinos/paquetes, registrar turistas y hacer reservas es de acceso público, simulando el flujo de un turista navegando el sitio.

## Autores

Proyecto desarrollado por el **Grupo G2** como prototipo funcional para la materia de Metodologías de Desarrollo de Software, aplicando la metodología ágil Scrum.