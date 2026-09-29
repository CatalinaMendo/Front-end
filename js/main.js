import { cargarDatos } from './api.js';
import { montarLayout } from './layout.js';
import { el } from './utils.js';
import { pintarInicio } from './pages/inicio.js';
import { pintarNoticias } from './pages/noticias.js';
import { pintarContacto } from './pages/contacto.js';

const pagina = document.body.dataset.page;
montarLayout(pagina);

try {
  if (pagina === 'contacto') {
    pintarContacto();
  } else {
    const datos = await cargarDatos();
    (pagina === 'inicio' ? pintarInicio : pintarNoticias)(datos);
  }
} catch (error) {
  console.error(error);
  document.getElementById('principal').prepend(el('p', { class: 'error-global', role: 'alert' },
    'No pudimos cargar las noticias. Abre el sitio con un servidor local (por ejemplo, Live Server) e inténtalo de nuevo.'));
}
