const PREFIJO = 'othernewsco:';

export function leer(clave, porDefecto = []) {
  try {
    return JSON.parse(localStorage.getItem(PREFIJO + clave)) ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

export function escribir(clave, valor) {
  try {
    localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
  } catch {
    /* almacenamiento no disponible: la app sigue funcionando sin persistencia */
  }
}

export function agregar(clave, item) {
  escribir(clave, [...leer(clave), item]);
}
