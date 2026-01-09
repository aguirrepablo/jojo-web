# jojo.lab

`jojo.lab` es una plataforma de comunicación en tiempo real multi-inquilino diseñada para proporcionar servicios de chat aislados para diferentes clientes u organizaciones.

## Requisitos Previos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (Generalmente incluido con Docker Desktop)

## Cómo Ejecutar la Aplicación con Docker

La forma más sencilla de levantar el entorno completo (aplicación + base de datos) es usando Docker Compose.

### 1. Iniciar los Servicios

Desde la raíz del proyecto, ejecuta el siguiente comando para construir e iniciar los contenedores en segundo plano:

```bash
docker-compose up -d --build
```

- `--build`: Fuerza la reconstrucción de la imagen de la aplicación si ha habido cambios en el código.
- `-d`: Ejecuta los contenedores en modo "detached" (en segundo plano).

### 2. Verificar el Estado

Puedes verificar que los contenedores se están ejecutando correctamente con:

```bash
docker-compose ps
```

Deberías ver dos servicios en estado `Up`: `postgres` y `app`.

### 3. Acceder a la Aplicación

Una vez que los contenedores estén en funcionamiento, la aplicación estará disponible en:

- **API HTTP**: `http://localhost:8080`
- **Base de Datos**: Accesible en `localhost:5432` (si necesitas conectarte con un cliente de base de datos).

### Migraciones de la Base de Datos

Las migraciones de la base de datos se aplican automáticamente cada vez que la aplicación se inicia, por lo que no se requiere ninguna acción manual.

### 4. Detener los Servicios

Para detener los servicios, ejecuta:

```bash
docker-compose down
```

## Desarrollo Local (Alternativo)

Si prefieres ejecutar la aplicación localmente sin Docker, sigue estos pasos.

### Requisitos Previos Locales

- [Go](https://golang.org/doc/install) (versión 1.21 o superior)
- Una instancia de PostgreSQL en ejecución.

### 1. Configurar la Base de Datos

Asegúrate de que tu base de datos PostgreSQL esté en funcionamiento y crea una base de datos (por ejemplo, `jojo_labs`).

### 2. Configurar el Entorno

La aplicación se puede configurar a través de un archivo `config.yaml` o mediante variables de entorno. Puedes copiar el archivo `config.yaml` existente y modificarlo según tu configuración local.

**`config.yaml` de ejemplo:**
```yaml
DB_HOST: localhost
DB_PORT: 5432
DB_USER: tu_usuario_postgres
DB_PASSWORD: tu_contraseña_postgres
DB_NAME: jojo_labs
JWT_SECRET: supersecret
```

### 3. Ejecutar la Aplicación

Navega al directorio raíz del proyecto y ejecuta el siguiente comando para iniciar la aplicación:

```bash
go run ./cmd/server/main.go
```

La aplicación se iniciará y se conectará a la base de datos que especificaste.

---

## Documentación de la API (v1)

Esta documentación describe cómo interactuar con los endpoints de la API de `jojo.lab`.

**URL Base**: `http://localhost:8080/v1`

### Autenticación

Actualmente, los endpoints públicos no requieren autenticación. Sin embargo, el endpoint de `login` está diseñado para un futuro sistema de autenticación basado en JWT. Las rutas protegidas por autenticación se añadirán próximamente.

### Endpoints

#### 1. Crear un Inquilino (Tenant)

Este endpoint crea un nuevo inquilino (tenant) en el sistema. Un inquilino representa una organización o cliente aislado.

- **Método**: `POST`
- **Endpoint**: `/tenants`
- **Body (JSON)**:
  - `name` (string, requerido): El nombre del inquilino. Este nombre se usará para generar un "slug" único.

**Ejemplo con `curl`:**

```bash
curl -X POST \
  http://localhost:8080/v1/tenants \
  -H 'Content-Type: application/json' \
  -d 
'{ "name": "Mi Primera Empresa" }'
```

**Respuesta Exitosa (Código `201`):**

La respuesta incluirá los detalles del inquilino recién creado, incluyendo su ID y slug.

```json
{
    "ID": "a1b2c3d4-e5f6-...",
    "Name": "Mi Primera Empresa",
    "Slug": "mi-primera-empresa",
    "CreatedAt": "...",
    "UpdatedAt": "..."
}
```

#### 2. Iniciar Sesión

Este endpoint se utiliza para autenticar a un usuario dentro de un inquilino específico y obtener un token JWT.

- **Método**: `POST`
- **Endpoint**: `/login`
- **Body (JSON)**:
  - `email` (string, requerido): El correo electrónico del usuario.
  - `password` (string, requerido): La contraseña del usuario.
  - `tenant` (string, requerido): El "slug" del inquilino al que pertenece el usuario.

**Nota**: Para poder iniciar sesión, primero se debe haber creado un inquilino y un usuario asociado a él. El proceso de creación de usuario aún no está expuesto en la API, por lo que este endpoint es para uso futuro.

**Ejemplo con `curl`:**

```bash
curl -X POST \
  http://localhost:8080/v1/login \
  -H 'Content-Type: application/json' \
  -d 
'{ "email": "admin@example.com", "password": "supersecretpassword", "tenant": "mi-primera-empresa" }'
```

**Respuesta Exitosa (Código `200`):**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**Respuesta de Error (Código `401`):**

Si las credenciales son incorrectas, recibirás un error de "invalid credentials".

```json
{
    "error": "invalid credentials"
}
```

---

## Documentación de WebSocket

### Estado Actual

La funcionalidad de WebSocket está **totalmente implementada**. Permite la comunicación en tiempo real para la funcionalidad de chat.

-   **Endpoint**: `ws://localhost:8080/v1/ws`
-   **Autenticación**: Requerida. La conexión debe incluir una `apiKey` válida como parámetro en la URL.
-   **Recepción de Mensajes**: El servidor escucha mensajes JSON de los clientes.
-   **Persistencia**: Los mensajes recibidos se guardan en la base de datos.
-   **Transmisión (Broadcast)**: Los mensajes se retransmiten a todos los clientes conectados a la misma sala de conversación (`ConversationID`).

### Flujo de Comunicación

1.  **Conexión**: El cliente se conecta al endpoint `/v1/ws` proveyendo su `apiKey`.
    -   Ejemplo: `ws://localhost:8080/v1/ws?apiKey=TU_API_KEY`
2.  **Envío de Mensajes**: El cliente envía mensajes en formato JSON para especificar la conversación y el contenido.
    -   Formato: `{ "conversationId": "...", "content": "..." }`
3.  **Recepción de Mensajes**: El servidor persiste el mensaje y lo retransmite a todos los participantes de la conversación. El mensaje recibido de vuelta es el objeto completo del mensaje persistido, incluyendo su `ID`, `UserID`, `Timestamp`, etc.

### Ejemplo de Conexión y Envío

Puedes usar una herramienta como `websocat` para probar la conexión y enviar mensajes.

1.  **Conexión**:
    Abre una terminal y conéctate usando una `apiKey` válida. Reemplaza `TU_API_KEY` con una clave real.

    ```bash
    websocat "ws://localhost:8080/v1/ws?apiKey=TU_API_KEY"
    ```

2.  **Enviar un Mensaje**:
    Una vez conectado, puedes enviar un mensaje en formato JSON. Reemplaza el `conversationId` con un UUID válido de una conversación.

    ```json
    { "conversationId": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d", "content": "Hola, este es mi primer mensaje!" }
    ```

La terminal recibirá de vuelta el mensaje completo una vez que haya sido procesado y guardado por el servidor.