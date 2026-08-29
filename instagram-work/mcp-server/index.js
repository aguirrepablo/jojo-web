import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const GRAPH_API_VERSION = "v21.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

// Helper para validar credenciales
function getCredentials() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    throw new Error(
      "Credenciales faltantes. Asegúrate de configurar INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_ACCOUNT_ID en las variables de entorno o archivo .env."
    );
  }

  return { accessToken, accountId };
}

// Helper para realizar llamadas a la Graph API de Meta
async function callGraphApi(endpoint, options = {}) {
  const { accessToken } = getCredentials();
  const url = new URL(`${GRAPH_API_BASE}${endpoint}`);
  
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  // Agregar token de acceso
  url.searchParams.append("access_token", accessToken);

  const fetchOptions = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url.toString(), fetchOptions);
  const data = await response.json();

  if (!response.ok || data.error) {
    const errorMsg = data.error?.message || response.statusText;
    const errorCode = data.error?.code ? ` (Code: ${data.error.code})` : "";
    throw new Error(`Error en Instagram Graph API${errorCode}: ${errorMsg}`);
  }

  return data;
}

// Crear el servidor MCP
const server = new McpServer({
  name: "instagram-mcp-server",
  version: "1.0.0",
});

// Tool 1: Obtener información del perfil
server.tool(
  "instagram_get_account_info",
  "Obtiene la información y estadísticas generales del perfil de Instagram Business conectado (seguidores, biografía, publicaciones totales, etc.)",
  {},
  async () => {
    try {
      const { accountId } = getCredentials();
      const data = await callGraphApi(`/${accountId}`, {
        params: {
          fields: "id,username,name,biography,profile_picture_url,followers_count,follows_count,media_count,website",
        },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al obtener información de la cuenta: ${error.message}` }],
      };
    }
  }
);

// Tool 2: Listar publicaciones recientes
server.tool(
  "instagram_get_recent_media",
  "Lista las publicaciones más recientes de la cuenta de Instagram con sus métricas básicas (caption, likes, comentarios, tipo de media y enlaces)",
  {
    limit: z.number().optional().default(10).describe("Cantidad máxima de publicaciones a obtener (por defecto 10, máximo 50)"),
  },
  async ({ limit }) => {
    try {
      const { accountId } = getCredentials();
      const data = await callGraphApi(`/${accountId}/media`, {
        params: {
          fields: "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count",
          limit: Math.min(limit || 10, 50),
        },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.data || [], null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al obtener publicaciones recientes: ${error.message}` }],
      };
    }
  }
);

// Tool 3: Obtener métricas / insights de un post específico
server.tool(
  "instagram_get_media_insights",
  "Obtiene las estadísticas detalladas (impresiones, alcance, guardados, compartidos, interacciones) de una publicación específica",
  {
    mediaId: z.string().describe("ID de la publicación de Instagram"),
  },
  async ({ mediaId }) => {
    try {
      const data = await callGraphApi(`/${mediaId}/insights`, {
        params: {
          metric: "impressions,reach,saved,shares,total_interactions",
        },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.data || [], null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al obtener insights de la publicación ${mediaId}: ${error.message}` }],
      };
    }
  }
);

// Tool 4: Publicar una foto única
server.tool(
  "instagram_publish_photo",
  "Publica una imagen individual en el feed de Instagram con su texto (caption) y hashtags. La URL de la imagen debe ser pública y accesible.",
  {
    imageUrl: z.string().url().describe("URL pública de la imagen (JPG/PNG accesible por los servidores de Meta)"),
    caption: z.string().describe("Texto de la publicación con hashtags"),
  },
  async ({ imageUrl, caption }) => {
    try {
      const { accountId } = getCredentials();

      // Paso 1: Crear contenedor de media
      const container = await callGraphApi(`/${accountId}/media`, {
        method: "POST",
        params: {
          image_url: imageUrl,
          caption: caption,
        },
      });

      const creationId = container.id;

      // Paso 2: Publicar el contenedor
      const publishResult = await callGraphApi(`/${accountId}/media_publish`, {
        method: "POST",
        params: {
          creation_id: creationId,
        },
      });

      return {
        content: [
          {
            type: "text",
            text: `¡Foto publicada exitosamente! ID de la publicación: ${publishResult.id}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al publicar foto: ${error.message}` }],
      };
    }
  }
);

// Tool 5: Publicar un carrusel de imágenes
server.tool(
  "instagram_publish_carousel",
  "Publica un carrusel de múltiples imágenes (de 2 a 10 slides) en el feed de Instagram con un caption común",
  {
    imageUrls: z.array(z.string().url()).min(2).max(10).describe("Array de 2 a 10 URLs públicas de imágenes en orden de visualización"),
    caption: z.string().describe("Texto de la publicación con hashtags"),
  },
  async ({ imageUrls, caption }) => {
    try {
      const { accountId } = getCredentials();

      // Paso 1: Crear contenedores individuales para cada imagen hija
      const childContainerIds = [];
      for (const url of imageUrls) {
        const itemContainer = await callGraphApi(`/${accountId}/media`, {
          method: "POST",
          params: {
            image_url: url,
            is_carousel_item: "true",
          },
        });
        childContainerIds.push(itemContainer.id);
      }

      // Paso 2: Crear el contenedor padre del carrusel
      const carouselContainer = await callGraphApi(`/${accountId}/media`, {
        method: "POST",
        params: {
          media_type: "CAROUSEL",
          children: childContainerIds.join(","),
          caption: caption,
        },
      });

      // Paso 3: Publicar el carrusel
      const publishResult = await callGraphApi(`/${accountId}/media_publish`, {
        method: "POST",
        params: {
          creation_id: carouselContainer.id,
        },
      });

      return {
        content: [
          {
            type: "text",
            text: `¡Carrusel de ${imageUrls.length} diapositivas publicado exitosamente! ID: ${publishResult.id}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al publicar carrusel: ${error.message}` }],
      };
    }
  }
);

// Tool 6: Publicar un Reel (Video)
server.tool(
  "instagram_publish_reel",
  "Publica un video / Reel en Instagram con su texto y portada opcional. El video debe ser accesible por URL pública.",
  {
    videoUrl: z.string().url().describe("URL pública del archivo de video (MP4)"),
    caption: z.string().describe("Texto del Reel con hashtags"),
    coverUrl: z.string().url().optional().describe("URL pública opcional para la imagen de portada"),
  },
  async ({ videoUrl, caption, coverUrl }) => {
    try {
      const { accountId } = getCredentials();

      // Paso 1: Crear contenedor de Reel
      const containerParams = {
        media_type: "REELS",
        video_url: videoUrl,
        caption: caption,
      };

      if (coverUrl) {
        containerParams.cover_url = coverUrl;
      }

      const container = await callGraphApi(`/${accountId}/media`, {
        method: "POST",
        params: containerParams,
      });

      // Paso 2: Publicar el Reel
      const publishResult = await callGraphApi(`/${accountId}/media_publish`, {
        method: "POST",
        params: {
          creation_id: container.id,
        },
      });

      return {
        content: [
          {
            type: "text",
            text: `¡Reel enviado a publicación exitosamente! ID: ${publishResult.id}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al publicar Reel: ${error.message}` }],
      };
    }
  }
);

// Tool 7: Obtener comentarios de una publicación
server.tool(
  "instagram_get_comments",
  "Lista los comentarios realizados en una publicación específica",
  {
    mediaId: z.string().describe("ID de la publicación de Instagram"),
  },
  async ({ mediaId }) => {
    try {
      const data = await callGraphApi(`/${mediaId}/comments`, {
        params: {
          fields: "id,text,timestamp,username,like_count,replies",
        },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.data || [], null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al obtener comentarios: ${error.message}` }],
      };
    }
  }
);

// Tool 8: Responder a un comentario
server.tool(
  "instagram_reply_comment",
  "Responde a un comentario específico de Instagram",
  {
    commentId: z.string().describe("ID del comentario al que se desea responder"),
    message: z.string().describe("Texto de la respuesta"),
  },
  async ({ commentId, message }) => {
    try {
      const data = await callGraphApi(`/${commentId}/replies`, {
        method: "POST",
        params: {
          message: message,
        },
      });

      return {
        content: [
          {
            type: "text",
            text: `¡Comentario respondido exitosamente! ID de respuesta: ${data.id}`,
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error al responder comentario: ${error.message}` }],
      };
    }
  }
);

// Iniciar el servidor por transporte Stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Instagram MCP Server iniciado correctamente en modo Stdio.");
}

main().catch((err) => {
  console.error("Error fatal al iniciar el servidor MCP:", err);
  process.exit(1);
});
