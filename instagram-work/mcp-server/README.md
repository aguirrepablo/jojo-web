# Instagram MCP Server

Servidor de **Model Context Protocol (MCP)** para interactuar con la **Instagram Graph API** de Meta.

---

## 🛠️ Herramientas Disponibles

1. `instagram_get_account_info`: Obtiene información del perfil (seguidores, bio, posts totales, foto de perfil).
2. `instagram_get_recent_media`: Lista las publicaciones recientes con likes, comentarios, tipo de media y permalinks.
3. `instagram_get_media_insights`: Obtiene impresiones, alcance, guardados, compartidos e interacciones de un post.
4. `instagram_publish_photo`: Publica una foto individual con caption y hashtags.
5. `instagram_publish_carousel`: Publica un carrusel de 2 a 10 imágenes.
6. `instagram_publish_reel`: Publica un video / Reel con caption y portada opcional.
7. `instagram_get_comments`: Lista los comentarios de una publicación.
8. `instagram_reply_comment`: Responde a un comentario específico.

---

## ⚙️ Configuración

### 1. Variables de Entorno
Copiá `.env.example` a `.env` o configuralas en tu archivo MCP:
* `INSTAGRAM_ACCESS_TOKEN`: Token de acceso de usuario generado en Meta for Developers.
* `INSTAGRAM_ACCOUNT_ID`: ID de la cuenta de Instagram Business.

---

## 🔌 Configuración en Asistentes de IA

### A. Antigravity / Gemini (`~/.gemini/config/mcp_config.json`)
Ya configurado en `C:\Users\peagu\.gemini\config\mcp_config.json`.

### B. Claude Desktop (`%APPDATA%\Claude\claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "instagram": {
      "command": "node",
      "args": [
        "C:\\Users\\peagu\\Workspace\\jojo\\jojo-web\\instagram-work\\mcp-server\\index.js"
      ],
      "env": {
        "INSTAGRAM_ACCESS_TOKEN": "TU_ACCESS_TOKEN",
        "INSTAGRAM_ACCOUNT_ID": "TU_ACCOUNT_ID"
      }
    }
  }
}
```

### C. VS Code (Cline / Roo Code)
Pegar el mismo bloque en la configuración de MCP de la extensión.
