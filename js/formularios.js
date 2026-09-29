const LETRAS = /^[\p{L}\s'.-]{2,40}$/u;
const nombreValido = (v) => (!v ? 'Escribe este dato.' : LETRAS.test(v) ? '' : 'Usa solo letras (entre 2 y 40 caracteres).');
const texto = (min, max) => (v) =>
  v.length < min ? `Escribe al menos ${min} caracteres.` : v.length > max ? `Máximo ${max} caracteres.` : '';

// Cada regla devuelve un mensaje de error, o '' si el valor es válido.
const REGLAS = {
  nombre: nombreValido,
  apellido: nombreValido,
  email: (v) => (!v ? 'Escribe tu correo.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Escribe un correo válido, como nombre@dominio.com.'),
  mensaje: texto(10, 500),
  opinion: texto(10, 200),
};

export function activarFormulario(form, alEnviar) {
  const campos = [...form.querySelectorAll('[data-campo]')];

  const validar = (campo) => {
    const error = REGLAS[campo.name](campo.value.trim());
    form.querySelector(`#error-${campo.id}`).textContent = error;
    campo.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
  };

  campos.forEach((campo) => {
    campo.addEventListener('blur', () => validar(campo));
    campo.addEventListener('input', () => {
      if (campo.getAttribute('aria-invalid') === 'true') validar(campo);
    });
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const resultados = campos.map(validar); // valida todos para mostrar todos los errores
    if (resultados.includes(false)) {
      campos[resultados.indexOf(false)].focus();
      return;
    }
    alEnviar(Object.fromEntries(campos.map((c) => [c.name, c.value.trim()])));
    form.reset();
    campos.forEach((c) => c.removeAttribute('aria-invalid'));
  });
}
