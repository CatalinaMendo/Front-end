import { activarFormulario } from '../formularios.js';
import { agregar } from '../storage.js';

export function pintarContacto() {
  const estado = document.getElementById('estado-contacto');
  activarFormulario(document.getElementById('form-contacto'), (datos) => {
    agregar('mensajes', { ...datos, fecha: new Date().toISOString() }); // simulación: sin backend
    estado.textContent = 'Recibimos tu mensaje. Te responderemos pronto.';
  });
}
