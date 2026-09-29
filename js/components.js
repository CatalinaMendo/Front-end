import { el, formatearFecha } from './utils.js';
import { esFavorito, alternar } from './favoritos.js';

export function imagen(noticia) {
  const img = el('img', { src: noticia.imagen, alt: noticia.titulo, loading: 'lazy' });
  // Si la imagen no existe, se muestra un bloque gris en su lugar.
  img.addEventListener('error', () => img.replaceWith(el('div', { class: 'img-placeholder', 'aria-hidden': 'true' })));
  return img;
}

export function botonFavorito(id) {
  const boton = el('button', { type: 'button', class: 'btn-fav' });
  const pintar = () => {
    const activo = esFavorito(id);
    boton.setAttribute('aria-pressed', String(activo));
    boton.textContent = activo ? '★ Guardada' : '☆ Guardar';
  };
  boton.addEventListener('click', () => { alternar(id); pintar(); });
  pintar();
  return boton;
}

export const meta = (n) =>
  el('p', { class: 'meta' }, el('span', {}, n.categoria), el('time', { datetime: n.fecha }, formatearFecha(n.fecha)));

export function tarjeta(n) {
  return el('article', { class: 'tarjeta' },
    el('a', { href: `noticias.html?id=${encodeURIComponent(n.id)}`, class: 'tarjeta-enlace' }, imagen(n), el('h3', {}, n.titulo)),
    meta(n),
    botonFavorito(n.id));
}
