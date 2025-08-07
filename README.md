PRUEBA TECNICA

Este proyecto es una prueba tecnica desarrollada en Next.js que incluye paginacion de 2 tipos paginacion estadar y scroll infinito, tambien incluye implementacion de Socket.io para simular un chat, diseñado en un dashboard tipo SPA.

En el desarrollo de este proyecto se usaron las siguiente tecnologias:

TECNOLOGIAS:

🧱 Core
Next.js 15 + Node.js 22.14.0 + TypeScript
Se eligió Next.js 15 por su enfoque moderno para aplicaciones fullstack con App Router, manejo de rutas flexible, SSR/SSG, y una integración fluida con TypeScript. Además, ofrece una excelente experiencia de desarrollo y rendimiento optimizado.
Node.js 22.14.0 se usa como entorno de ejecución del backend, aprovechando las últimas mejoras de rendimiento y compatibilidad con ES Modules.
TypeScript se utilizó para mejorar la mantenibilidad y prevenir errores en tiempo de compilación.

🎨 UI y estilos
Tailwind CSS 4.1.11
Se eligió Tailwind por su productividad y la capacidad de crear interfaces consistentes rápidamente sin escribir CSS personalizado.

shadcn/ui
Utilizado como biblioteca de componentes basada en Radix UI y Tailwind. Permite tener componentes accesibles, personalizables y listos para producción.

📦 Data fetching
TanStack Query (React Query) 5.84.1
Se emplea para el manejo eficiente de datos asincrónicos. Automatiza el caching, sincronización y revalidación de datos, reduciendo el código repetitivo y mejorando la experiencia del usuario.

🧠 State management
zustand
Se optó por Zustand debido a su simplicidad y rendimiento en la gestión de estado global. Ofrece una API intuitiva y es ideal para manejar estados compartidos sin la complejidad de Redux.

💬 Realtime
Socket.IO
Utilizado para funcionalidades en tiempo real (como chats o notificaciones). Socket.IO proporciona una comunicación bidireccional eficiente entre cliente y servidor con soporte para reconexiones, rooms y más.

📝 Forms y validaciones
Formik + Yup
Formik facilita la gestión del estado de formularios y el control de eventos en React. Combinado con Yup, se logra una validación declarativa y robusta.

🌐 Internacionalización
i18next
Usado para ofrecer soporte multilenguaje. Su integración con React y extensibilidad lo convierten en una opción ideal para manejar traducciones de forma eficiente y escalable. 

INSTALACION

Clona el repositorio y levanta ambos servidores (frontend y websocket).

```bash
# entrar al frontend
cd frontend

# instalar dependencias y levantar dev server
npm install
npm run dev
```
en una terminal nueva, levantar el servidor de websocket:
```bash
cd socket-server
npm install
npm start
```
listo. ahora puedes navegar y probar el scroll infinito y el chat en tiempo real.

FUNCIONALIDAD CREATIVA

Se implementó soporte multilenguaje utilizando i18next, considerando la necesidad actual de desarrollar aplicaciones web accesibles a una audiencia global. La elección de i18next se basó en su compatibilidad con React, su arquitectura modular y su capacidad para manejar traducciones dinámicas.



