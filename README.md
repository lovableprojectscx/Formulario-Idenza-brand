# Denza — Plataforma de Briefing & Panel de Marca

Formulario moderno e interactivo para la captura de identidad de marca de clientes de **Denza**, conectado en tiempo real con Supabase y dotado de un **Panel de Recepción** administrativo protegido.

---

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 🔐 Panel de Recepción (Administración)

- **Acceso:** Clic en **"Acceso del equipo"** en la barra superior o en el pie de página.
- **Contraseña única de acceso:**
  ```
  ADMIN1223
  ```

### Funcionalidades del Panel:
- 📊 **Métricas en tiempo real:** Total recibidos, Nuevos, En revisión, En diseño y Completados.
- 🔍 **Buscador & Filtros:** Búsqueda rápida por nombre de cliente, empresa, teléfono o rol.
- 📋 **Ficha de Detalle Completa:** Visualización de las 7 partes del briefing:
  - Datos de negocio, productos y trayectoria.
  - Perfil del cliente y posicionamiento de precio.
  - Análisis de competencia y líneas rojas.
  - Personalidad de marca con calibración de barras interactivas.
  - Logo, colores elegidos/descartados y galería de imágenes de referencia en alta resolución.
  - Puntos de contacto (letrero, muebles, uniformes, camioneta, etc.) y fecha límite.
  - Datos de contacto y botón de WhatsApp directo.
- 💬 **Copiar Ficha para WhatsApp:** Genera un resumen listo para copiar y enviar al equipo o al cliente.
- 📝 **Notas Internas del Equipo:** Anotaciones persistentes en Supabase para el diseñador.
- 🏷️ **Cambio de Estado:** Nuevo ➔ En revisión ➔ En diseño ➔ Completado.
- 🖨️ **Imprimir / Exportar a PDF:** Formato limpio para impresión.

---

## 🗄️ Infraestructura Supabase

- **Proyecto:** `denza-branding` (`tgqvzxlkbmcihxghzqwq`)
- **Región:** `us-east-1`
- **Tabla:** `public.brand_briefings` (con Row Level Security)
- **Bucket Storage:** `briefing_files` (hasta 12 imágenes por briefing, 10 MB c/u)
- **Variables de Entorno (`.env` - protegido en `.gitignore`):**
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_PASSWORD=ADMIN1223`
