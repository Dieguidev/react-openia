<!-- filepath: g:\PROYECTOS\NEST\FH\OPENIA\react-gpt\README.md -->

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="60" height="60"/>
</p>

<h1 align="center">ReactGPT</h1>

<p align="center">
  <b>Aplicación web de corrección ortográfica, traducción, pros & cons, comparación en streaming, y más, potenciada por IA y construida con React + TypeScript + Vite.</b>
</p>

---

## 🚀 Características principales

- ✍️ <b>Corrección Ortográfica:</b> Corrige textos en español con puntuación, retroalimentación detallada y errores destacados.
- ⚖️ <b>Pros & Cons:</b> Análisis detallado de ventajas y desventajas de cualquier tema mediante IA.
- ⚡ <b>Pros & Cons Streaming:</b> Visualización en tiempo real de la respuesta generada por IA con soporte para cancelación.
- 🔄 <b>Traducción:</b> Traducción a múltiples idiomas con selector integrado y soporte streaming.
- 🔊 <b>Texto a audio:</b> Convertidor de texto a voz con selección de 6 diferentes voces y reproducción automática.
- 🖼️ <b>Generación de imágenes:</b> Creación y edición de imágenes con IA (en desarrollo).
- 🎤 <b>Audio a texto:</b> Transcripción de audio a texto (en desarrollo).
- 🤖 <b>Asistente avanzado:</b> Asistente IA personalizado (en desarrollo).
- 💬 <b>Interfaz de chat moderna:</b> UI con tema oscuro, burbujas de chat y soporte para markdown.
- ⏹️ <b>Sistema de cancelación:</b> Cancelación de peticiones en streaming para evitar problemas de concurrencia.

---

## 🖥️ Vista previa

<p align="center">
  <img src="https://i.imgur.com/1Q9Z1ZB.png" width="600" alt="Vista previa ReactGPT"/>
</p>

---

## 🛠️ Tecnologías utilizadas

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="24"/> React 19
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="24"/> TypeScript
- <img src="https://vitejs.dev/logo.svg" width="24"/> Vite
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="24"/> TailwindCSS
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="24"/> Node.js (backend IA)
- Fetch API con streaming y generators
- React Router DOM para navegación
- React Markdown para visualización de texto con formato

---

## 📦 Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Dieguidev/react-openia
   cd react-gpt
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Copia `.env.template` a `.env` y ajusta la URL de la API:
   ```
   VITE_GPT_API=http://localhost:3000/gpt
   ```
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```
5. Accede a [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📁 Estructura del proyecto

```
react-gpt/
├── src/
│   ├── core/           # Casos de uso y lógica de negocio
│   │   └── use-cases/  # Implementaciones de funcionalidades (ortografía, traducción, etc.)
│   ├── interfaces/     # Tipos e interfaces TypeScript para respuestas API
│   ├── presentation/   # Frontend de la aplicación
│   │   ├── components/ # Componentes reutilizables (chat bubbles, inputs, etc.)
│   │   ├── layouts/    # Estructura visual principal
│   │   ├── pages/      # Páginas para cada funcionalidad
│   │   └── router/     # Configuración de rutas
│   └── main.tsx        # Punto de entrada principal
├── public/             # Archivos estáticos
├── .env.template       # Variables de entorno de ejemplo
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

---

## 📌 Funcionalidades implementadas en detalle

### ✍️ Corrección Ortográfica

- Envía textos en español para corrección ortográfica instantánea.
- Recibe puntuación de precisión ortográfica (0-100%).
- Lista detallada de errores encontrados y sugerencias de mejora.
- Interfaz especial `GptOrthographyMessage` para mostrar resultados formatados.

**Ejemplo de uso:**

1. Escribe un texto con errores deliberados.
2. El sistema analiza y muestra errores específicos.
3. Se proporciona una puntuación de calidad ortográfica.

---

### ⚖️ Pros & Cons (Análisis de ventajas y desventajas)

- Comparación balanceada de cualquier tema, producto o decisión.
- Análisis estructurado dividido en pros y contras.
- Implementado mediante case de uso `prosConsUseCase` para obtener respuestas completas.

**Ejemplo de uso:**

1. Escribe el tema a analizar (ej: "Trabajar desde casa vs oficina").
2. Recibe un análisis detallado de ambas perspectivas.

---

### ⚡ Pros & Cons con Streaming

- Visualiza en tiempo real cómo se construye la respuesta del modelo AI.
- Usa `prosConsStreamGeneratorUseCase` con JavaScript generators para streaming.
- Sistema de cancelación implementado con `AbortController` para detener consultas.

**Características técnicas:**

- Utiliza `useRef` para mantener el estado del controlador de cancelación.
- Control de concurrencia con referencia a estado activo (`isRunning`).
- Actualización progresiva del mensaje a medida que llegan nuevos fragmentos.

**Ejemplo de uso:**

1. Inicia una consulta.
2. Observa cómo la respuesta se construye progresivamente.
3. Puedes cancelar y comenzar una nueva consulta sin esperar que finalice.

---

### 🔄 Traducción con Streaming

- Traducción de texto a 10 idiomas diferentes (alemán, árabe, bengalí, francés, hindi, inglés, japonés, mandarín, portugués, ruso).
- Selector de idioma integrado usando `TextMessageBoxSelect`.
- Visualización en tiempo real de la traducción mediante streaming.
- Controlador de cancelación para interrumpir traducciones en curso.

**Características técnicas:**

- Implementado con `translateStreamUseCase` utilizando generators y streaming.
- Usa `TextDecoder` para decodificar chunks de respuesta recibidos del backend.
- Soporte para cancelación y reinicio de traducciones.

---

### 🔊 Texto a Audio

- Conversión de texto a voz mediante IA.
- Selector con 6 diferentes voces: Nova, Alloy, Echo, Fable, Onyx y Shimmer.
- Reproducción automática del audio generado.
- Interfaz especial con reproductor de audio integrado.

**Características técnicas:**

- Implementado mediante el caso de uso `textToAudioUseCase` que se conecta con el backend.
- Sistema de tipos discriminados para diferenciar mensajes de texto y audio.
- Componente `GptMessageAudio` especializado para mostrar y reproducir archivos de audio.
- Uso de `URL.createObjectURL()` para manejar blobs de audio recibidos del servidor.

**Ejemplo de uso:**

1. Escribe un texto para convertir a audio.
2. Selecciona una de las 6 voces disponibles.
3. El audio generado se reproduce automáticamente y queda disponible para escuchar nuevamente.

---

### 💬 Interfaz de Usuario

- Diseño oscuro moderno con esquema de colores azul/índigo.
- Componentes de mensajes diferenciados:
  - `MyMessage`: Burbujas de usuario alineadas a la derecha
  - `GptMessage`: Burbujas de asistente alineadas a la izquierda
  - `GptOrthographyMessage`: Visualización especial para correcciones
  - `GptMessageAudio`: Visualización con reproductor de audio integrado
- Soporte para renderizado Markdown en respuestas del asistente.
- Animación de carga `TypingLoader` para indicar actividad.
- Layout principal con menú lateral para navegación entre funcionalidades.

---

### ⚙️ Arquitectura

- Patrón de casos de uso para encapsular la lógica de negocio.
- Separación de interfaces para tipado de respuestas API.
- Componentización de UI para maximizar reutilización.
- Sistema de streaming basado en generators para respuestas en tiempo real.
- Manejo de estado con React hooks (`useState`, `useRef`).
- Control de concurrencia para prevenir problemas con múltiples peticiones.

---

## 🚧 Funcionalidades en desarrollo

- 🖼️ **Generación de Imágenes**: Creación de imágenes desde descripciones textuales.
- 🎨 **Edición de Imágenes**: Modificación de imágenes existentes con instrucciones de texto.
- 🎤 **Audio a Texto**: Transcripción precisa de archivos de audio.
- 🤖 **Asistente**: Asistente interactivo para consultas generales y específicas.

---

## 🧑‍💻 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas, mejoras o encuentras bugs:

1. Haz fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

MIT

---

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40"/>
</p>
