import { el } from './utils.js';

const ENLACES = [
  { id: 'inicio', texto: 'Inicio', href: 'index.html' },
  { id: 'noticias', texto: 'Noticias', href: 'noticias.html' },
  { id: 'contacto', texto: 'Contacto', href: 'contacto.html' },
];

export function montarLayout(paginaActual) {
  document.getElementById('site-header').replaceChildren(
    el('div', { class: 'contenedor cabecera-interna' },
      el('a', { href: 'index.html', class: 'logo' }, 'El Noticazo'),
      el('nav', { 'aria-label': 'Principal' },
        el('ul', {}, ...ENLACES.map((e) =>
          el('li', {}, el('a', { href: e.href, 'aria-current': e.id === paginaActual ? 'page' : false }, e.texto)))))));

  document.getElementById('site-cta').replaceChildren(
    el('div', { class: 'contenedor cta-interno' },
      el('p', {}, '¡Gracias por confiar en nosotros!'),
      el('div', { class: 'cta-botones' },
        el('a', { class: 'btn btn-rojo', href: 'contacto.html' }, 'Contacto'),
        el('a', { class: 'btn btn-claro', href: 'index.html#opinion' }, 'Déjanos aquí tu opinión'))));

  document.getElementById('site-footer').replaceChildren(
    el('div', { class: 'contenedor footer-interno' },
      el('p', { class: 'logo-footer' }, 'El Noticazo'),
      el('dl', {},
        el('dt', {}, 'Email'), el('dd', {}, 'contacto@elnoticazo.com'),
        el('dt', {}, 'Facebook'), el('dd', {}, 'El Noticazo'),
        el('dt', {}, 'Instagram'), el('dd', {}, '@elnoticazo'),
        el('dt', {}, 'Celular'), el('dd', {}, '300 000 0000'))));
}
