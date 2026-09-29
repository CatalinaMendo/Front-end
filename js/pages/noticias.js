import { el, formatearFecha } from '../utils.js';
import { imagen, botonFavorito, meta } from '../components.js';
import { esFavorito } from '../favoritos.js';

const itemNoticia = (n) =>
  el('article', { class: 'noticia' },
    imagen(n),
    el('div', {},
      el('h2', {}, el('a', { href: `noticias.html?id=${encodeURIComponent(n.id)}` }, n.titulo)),
      meta(n),
      el('p', {}, n.resumen),
      el('div', { class: 'acciones' },
        el('a', { class: 'btn btn-indigo', href: `noticias.html?id=${encodeURIComponent(n.id)}` }, 'Leer noticia'),
        botonFavorito(n.id))));

function detalle(n) {
  return el('article', { class: 'detalle' },
    el('a', { href: 'noticias.html', class: 'volver' }, '← Volver a noticias'),
    el('h1', {}, n.titulo),
    meta(n),
    imagen(n),
    ...n.contenido.map((p) => el('p', {}, p)),
    el('p', { class: 'fuente' }, 'Fuente: ', el('a', { href: n.url, target: '_blank', rel: 'noopener noreferrer' }, `${n.fuente} (${formatearFecha(n.fecha)})`)),
    botonFavorito(n.id));
}

function listado(datos, categoriaInicial) {
  const categorias = [...new Set(datos.noticias.map((n) => n.categoria))];
  const select = el('select', { id: 'filtro-categoria' },
    el('option', { value: '' }, 'Todas las categorías'),
    ...categorias.map((c) => el('option', { value: c }, c)));
  select.value = categorias.includes(categoriaInicial) ? categoriaInicial : '';
  const soloFav = el('input', { type: 'checkbox' });
  const resultados = el('div', { class: 'lista' });

  const pintar = () => {
    const lista = datos.noticias.filter((n) =>
      (!select.value || n.categoria === select.value) && (!soloFav.checked || esFavorito(n.id)));
    const vacio = soloFav.checked
      ? 'Aún no tienes noticias favoritas. Toca “Guardar” en una noticia para verla aquí.'
      : 'No hay noticias en esta categoría.';
    resultados.replaceChildren(...(lista.length ? lista.map(itemNoticia) : [el('p', { class: 'vacio' }, vacio)]));
  };

  select.addEventListener('change', pintar);
  soloFav.addEventListener('change', pintar);
  document.addEventListener('favoritos:cambio', () => { if (soloFav.checked) pintar(); });
  pintar();

  return el('div', {},
    el('h1', { class: 'titulo-rojo' }, 'Noticias'),
    el('div', { class: 'filtros' },
      el('label', { for: 'filtro-categoria' }, 'Categoría'), select,
      el('label', { class: 'check' }, soloFav, 'Solo favoritas')),
    resultados);
}

export function pintarNoticias(datos) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const contenedor = document.getElementById('contenido');
  if (!id) return contenedor.replaceChildren(listado(datos, params.get('categoria') ?? ''));

  const noticia = datos.noticias.find((n) => n.id === id);
  contenedor.replaceChildren(noticia ? detalle(noticia) : el('p', { class: 'vacio' }, 'No encontramos esa noticia. ', el('a', { href: 'noticias.html' }, 'Ver todas')));
  if (noticia) document.title = `${noticia.titulo} – OtherNewsCO`;
}
