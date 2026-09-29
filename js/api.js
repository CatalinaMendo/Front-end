export async function cargarDatos() {
  const respuesta = await fetch('data/noticias.json');
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al cargar noticias.json`);
  return respuesta.json();
}
