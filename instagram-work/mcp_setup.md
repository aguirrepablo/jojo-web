# Guía de Conexión del Servidor MCP de Instagram

Este documento explica cómo configurar el **Model Context Protocol (MCP)** en Antigravity para permitir que el agente interactúe directamente con la cuenta de Instagram de JOJO (publicación de posts, lectura de métricas y gestión de comentarios).

---

## 1. ¿Cómo funciona la integración MCP en Antigravity?

Antigravity lee los servidores MCP declarados en la configuración global del usuario:
* **Archivo de configuración:** `C:\Users\peagu\.gemini\config\mcp_config.json`
* Cuando se declara un servidor MCP, Antigravity detecta automáticamente sus herramientas (tools) y las deja disponibles en el chat.

---

## 2. Requisitos Previos en Meta (Instagram Graph API)

Para interactuar programáticamente con una cuenta de Instagram de forma oficial y segura, se utiliza la **Instagram Graph API**:

1. **Cuenta Profesional de Instagram:** La cuenta `@jojo.ar` debe estar configurada como cuenta de *Negocio* o *Creador*.
2. **Página de Facebook Vinculada:** Conectar la cuenta de Instagram a una Página de Facebook comercial.
3. **App en Meta for Developers:**
   - Ir a [developers.facebook.com](https://developers.facebook.com/).
   - Crear una aplicación de tipo *Empresarial / Business*.
   - Agregar el producto **Instagram Graph API**.
   - Generar un **Token de Acceso de Usuario** (con permisos: `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`, `instagram_manage_insights`, `pages_read_engagement`).
   - Obtener el **Instagram Business Account ID**.

---

## 3. Opciones de Servidor MCP para Instagram

### Opción A: Servidor MCP en Node.js / TypeScript (Recomendada)

Podemos crear un script MCP local en `instagram-work/mcp-server/` utilizando el SDK oficial `@modelcontextprotocol/sdk` y la API de Meta.

#### Herramientas que expone el MCP:
* `instagram_publish_photo`: Publica una imagen única con caption y hashtags.
* `instagram_publish_carousel`: Publica un carrusel de múltiples imágenes.
* `instagram_publish_reel`: Publica un video / Reel.
* `instagram_get_insights`: Obtiene impresiones, alcance, guardados y likes de publicaciones.
* `instagram_get_comments`: Lista comentarios recientes para responder o moderar.

#### Configuración en `mcp_config.json`:

```json
{
  "mcpServers": {
    "instagram": {
      "command": "node",
      "args": [
        "C:\\Users\\peagu\\Workspace\\jojo\\jojo-web\\instagram-work\\mcp-server\\index.js"
      ],
      "env": {
        "INSTAGRAM_ACCESS_TOKEN": "TU_ACCESS_TOKEN_DE_META",
        "INSTAGRAM_ACCOUNT_ID": "TU_INSTAGRAM_BUSINESS_ACCOUNT_ID"
      }
    }
  }
}
```

---

### Opción B: Servidor MCP en Python

Si preferís Python, se puede utilizar `fastmcp` con la librería `requests` conectada a los endpoints de `graph.facebook.com/v21.0/`:

```json
{
  "mcpServers": {
    "instagram-py": {
      "command": "python",
      "args": [
        "C:\\Users\\peagu\\Workspace\\jojo\\jojo-web\\instagram-work\\mcp-server\\server.py"
      ],
      "env": {
        "INSTAGRAM_ACCESS_TOKEN": "TU_ACCESS_TOKEN_DE_META",
        "INSTAGRAM_ACCOUNT_ID": "TU_INSTAGRAM_BUSINESS_ACCOUNT_ID"
      }
    }
  }
}
```

---

## 4. Estado Actual

1. [x] Estructura de carpetas creada en `instagram-work/`.
2. [x] Estrategia editorial y pilares definidos en [estrategia.md](file:///C:/Users/peagu/Workspace/jojo/jojo-web/instagram-work/estrategia.md).
3. [x] Calendario inicial y primeros 3 posts listos en [posts/](file:///C:/Users/peagu/Workspace/jojo/jojo-web/instagram-work/posts/).
4. [ ] Generar credenciales en Meta for Developers.
5. [ ] Instalar e inicializar el servidor MCP en `instagram-work/mcp-server/`.
6. [ ] Probar la primera publicación o lectura de insights desde el chat.
