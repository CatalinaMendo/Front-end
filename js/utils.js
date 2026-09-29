/** Crea un elemento del DOM. Los textos se insertan como nodos de texto (sin riesgo de XSS). */
export function el(tag, props = {}, ...hijos) {
  const nodo = document.createElement(tag);
  for (const [clave, valor] of Object.entries(props)) {
    if (clave === 'class') nodo.className = valor;
    else if (valor !== false && valor != null) nodo.setAttribute(clave, valor);
  }
  nodo.append(...hijos.flat().filter((h) => h != null));
  return nodo;
}

export function formatearFecha(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}
