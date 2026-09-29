# El Noticazo

Prototipo funcional (Entrega 2) del proyecto de Front End – Politécnico Grancolombiano,
adaptado a partir del mockup "El Noticazo" (Home, Noticias, Contacto).

## Funcionalidades
- Páginas: Inicio, Noticias (listado y detalle) y Contacto, en HTML, CSS y JavaScript puro.
- Renderizado dinámico de noticias, temas y opiniones desde `data/noticias.json`.
- Favoritos: botón "Guardar" en cada noticia, guardado en `localStorage`, con filtro "Solo favoritas".
- Formularios con validaciones (contacto y opiniones).

## Cómo ejecutarlo
Usa `fetch` y módulos ES, así que debe abrirse con un servidor local, no con doble clic:
- Copia la carpeta dentro de `webapps` de Tomcat y ábrela con `http://localhost:8080/elnoticazo/index.html`, o
- Ejecuta `python -m http.server 8000` dentro de la carpeta y abre `http://localhost:8000`.
