"use client";

import { useRef, useEffect, useCallback, useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Send, Bot, User, X, RotateCw } from "lucide-react";
import { useSessionStorage } from "@/hooks/useSessionStorage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const WS_URL = process.env.NEXT_PUBLIC_CHAT_WS_URL || "ws://localhost:8080/v1/ws";
const API_KEY = process.env.NEXT_PUBLIC_CHAT_API_KEY || "default_api_key";

export function Chat({ isOpen, onClose }: ChatProps) {
  const [messages, setMessages] = useSessionStorage<Message[]>('chat_messages', []);
  const [conversationId, setConversationId] = useSessionStorage<string>('chat_conversation_id', '');
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Mantener para UX, aunque WS es instantáneo
  
  const socketRef = useRef<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Inicializar ID de conversación si no existe
  useEffect(() => {
    if (!conversationId) {
      setConversationId(crypto.randomUUID());
    }
  }, [conversationId, setConversationId]);

  // Gestión de conexión WebSocket
  useEffect(() => {
    if (isOpen && !socketRef.current) {
      const url = `${WS_URL}?apiKey=${API_KEY}`;
      console.log("Conectando a:", url);
      
      const ws = new WebSocket(url);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("✅ Conectado al servidor de chat");
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Asumiendo que el backend devuelve el mensaje completo
          // Adaptar según la estructura real del backend. 
          // Si el mensaje es mío (re-broadcast), ya lo tengo, pero el backend confirma persistencia.
          // Para simplificar, si viene del backend y no es mi ID temporal, lo agrego.
          // O si el backend devuelve un ID diferente al temporal.
          
          // NOTA: El backend devuelve el mensaje persistido. 
          // Si yo envié un mensaje, probablemente quiera actualizar su estado o ID.
          // Por simplicidad en este prototipo, mostramos lo que llega si no está duplicado.
          
          // Ajuste: El backend devuelve un objeto con ID, UserID, Content, etc.
          // Vamos a asumir que "Assistant" responde como otro mensaje.
          // Si el backend solo hace "echo" de mi mensaje, necesito lógica para diferenciar.
          // Asumiremos que el backend procesará y enviará respuestas del asistente también via WS.
          
           console.log("📩 Mensaje recibido:", data);
           
           // Lógica básica para evitar duplicados inmediatos si el backend hace echo del user
           // y lógica para agregar respuestas del asistente.
           // Como no conozco la estructura exacta de "data" más allá de lo que dice el MD,
           // voy a asumir que 'data.content' tiene el texto.
           
           // Si el mensaje viene del sistema/asistente (lógica a determinar), agregarlo.
           // Por ahora, agregamos todo lo que no sea nuestro propio echo inmediato si ya lo tenemos.
           // Pero para evitar complejidad, confiaré en que el usuario ve su mensaje optimisticamente
           // y el backend manda respuestas.

           if (data.role === 'assistant' || (data.sender !== 'me' && !messages.some(m => m.content === data.content))) {
                const newMessage: Message = {
                    id: data.ID || `msg-${Date.now()}`,
                    role: data.role || "assistant", // Asumir asistente si no se especifica
                    content: data.content || JSON.stringify(data),
                };
                setMessages(prev => {
                    // Evitar duplicados simples por ID si viene
                    if (prev.some(m => m.id === newMessage.id)) return prev;
                    return [...prev, newMessage];
                });
                setIsLoading(false);
           }

        } catch (error) {
          console.error("Error procesando mensaje:", error);
        }
      };

      ws.onclose = () => {
        console.log("🔌 Desconectado del servidor de chat");
        setIsConnected(false);
        socketRef.current = null;
      };

      ws.onerror = (error) => {
        console.error("❌ Error en WebSocket:", error);
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [isOpen, setMessages, conversationId]); // Removido messages de deps para evitar reconexiones

  const scrollToBottom = () => {
    if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleClose = useCallback(() => { onClose(); }, [onClose]);
  
  const handleNewChat = () => { 
    setMessages([]); 
    setInput(""); 
    setConversationId(crypto.randomUUID());
    // Opcional: Desconectar y reconectar si el backend requiere nuevo handshake para nueva conv
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    };

    // Actualización Optimista
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
        const payload = {
            conversationId: conversationId,
            content: newUserMessage.content
        };
        socketRef.current.send(JSON.stringify(payload));
    } catch (error) {
        console.error("Error enviando mensaje:", error);
        // Podríamos mostrar error en UI
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40 animate-in fade-in duration-200" onClick={handleClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
        <div className="w-full h-full max-w-5xl max-h-[95vh] pointer-events-auto animate-in zoom-in-95 duration-200">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="bg-primary px-6 py-5 flex items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><Bot className="w-7 h-7 text-white" /></div>
                <div>
                  <h3 className="text-white text-lg">Asistente JOJO</h3>
                  <p className="text-white/80 text-sm">{isConnected ? "En línea" : "Conectando..."}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleNewChat} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Nuevo Chat"><RotateCw className="w-5 h-5 text-white" /></button>
                <button type="button" onClick={handleClose} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Cerrar chat"><X className="w-6 h-6 text-white" /></button>
              </div>
            </div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-background min-h-0">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-primary" /></div>)}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${m.role === "user" ? "bg-primary text-white" : "bg-card border border-border text-foreground"}`}><p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p></div>
                  {m.role === "user" && (<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-white" /></div>)}
                </div>
              ))}
               {isLoading && (
                <div className="flex justify-start items-center animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-3"><Bot className="w-5 h-5 text-primary" /></div>
                  <div className="text-sm text-muted-foreground">...</div>
                </div>
              )}
            </div>
            <div className="border-t border-border bg-card p-4 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu mensaje..." className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" disabled={!isConnected} />
                <Button type="submit" size="icon" className="h-12 w-12" disabled={!input.trim() || !isConnected} aria-label="Enviar mensaje"><Send className="h-5 w-5" /></Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}