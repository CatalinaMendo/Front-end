import { leer, escribir } from './storage.js';

const CLAVE = 'favoritos';

export const esFavorito = (id) => leer(CLAVE).includes(id);

export function alternar(id) {
  const actuales = leer(CLAVE);
  const nuevos = actuales.includes(id) ? actuales.filter((f) => f !== id) : [...actuales, id];
  escribir(CLAVE, nuevos);
  document.dispatchEvent(new CustomEvent('favoritos:cambio'));
  return nuevos.includes(id);
}
