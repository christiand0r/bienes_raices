# Bienes Raíces

Bienes Raíces es un proyecto monolitico desarrollado con Node.js y el patrón MVC para su construcción, tambien integra otras tecnologías como: Tailwind y Pug para trabajar las vistas, MySQL con Sequilize para la base de datos y utiliza como empaquetador Esbuild.

Este proyecto cuentan con características como:

- Autenticación (JWT).
- Publicación, edición y eliminación de propiedades.
- Navegación con protección de Rutas.
- Áreas públicas y privadas.
- Envio de emails al correo.

## Instalación

Una vez clonado, para poder utilizar este proyecto en desarrollo deberás realizar los siguientes pasos:

- Instalar las dependencias

```
-> npm install
```

- Configurar las variables de entorno

```
-> El archivo .env.example te servirá podrá servir como guía
```

- Ejecutar los seeders

```
-> npm run db:actions -- -i
```

Finalmente para iniciar el modo desarrollo tendrás dos opciones:

1. Ejecutar los scripts por separado:

```
-> npm run server
-> npm run js
-> npm run css
```

2. Ejecutar todos los scripts juntos

```
-> npm run dev
```
