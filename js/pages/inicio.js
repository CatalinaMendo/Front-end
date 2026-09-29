import { el } from '../utils.js';
import { tarjeta } from '../components.js';
import { activarFormulario } from '../formularios.js';
import { leer, agregar } from '../storage.js';

function pintarOpiniones(lista) {
  document.getElementById('opiniones').replaceChildren(...lista.map((o) =>
    el('figure', { class: 'opinion' },
      el('blockquote', {}, `“${o.texto}”`),
      el('figcaption', {}, el('strong', {}, o.autor), ` ${o.rol}`))));
}

export function pintarInicio(datos) {
  const ultimas = [...datos.noticias].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);
  document.getElementById('ultimas').replaceChildren(...ultimas.map(tarjeta));

  document.getElementById('temas-lista').replaceChildren(...datos.temas.map((t) =>
    el('li', {}, el('a', { href: `noticias.html?categoria=${encodeURIComponent(t.categoria)}` },
      el('strong', {}, t.nombre), el('span', {}, t.descripcion)))));

  pintarOpiniones([...datos.opiniones, ...leer('opiniones')]);

  const estado = document.getElementById('estado-opinion');
  activarFormulario(document.getElementById('form-opinion'), ({ nombre, opinion }) => {
    agregar('opiniones', { autor: nombre, rol: 'Lector', texto: opinion });
    pintarOpiniones([...datos.opiniones, ...leer('opiniones')]);
    estado.textContent = 'Gracias, tu opinión ya aparece en la página.';
  });
}
