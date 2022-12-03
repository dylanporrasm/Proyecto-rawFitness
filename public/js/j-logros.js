
// Tarea pendientes:
// 1. agregar logro a usuario
// 2. modificar logro y notificar cuando se logra la meta
// 3. cargar grafica de metas en progreso
import { obtenerLogros, obtenerUsuario } from "./servicios.js";

const select = document.getElementById('select');
const pesoObjetivo = document.getElementById('peso-objetivo');
const historialLogros = document.getElementById('historial-logros');

const generarTiposDeLogros = async (usuarioLogros) => {
  const logros = await obtenerLogros();
  logros.forEach(logro => {
    const existeLogroEnUsuario = usuarioLogros?.find(logroUsuario => logroUsuario?.logro?.nombre === logro.nombre);
    if (!existeLogroEnUsuario) {
        const nuevoHTML = `<option id="${logro.nombre}}">${logro.nombre}</option>`
        select.insertAdjacentHTML('beforeend', nuevoHTML);
    }
  });

  if (!select.childElementCount) {
    select.disabled = true;
    pesoObjetivo.disabled = true;
  }
}

const generarHistorialLogros = async (usuarioLogros) => {
  usuarioLogros.forEach(logroUsuario => {
    const nuevoHTML = `<div>${logroUsuario?.logro?.nombre} - ${logroUsuario?.realizado ? 'logrado' : 'sin lograr'}</div>`
    historialLogros.insertAdjacentHTML('beforeend', nuevoHTML);
  })
}

const cargarDatos = async () => {
  const usuario = await obtenerUsuario();
  await generarTiposDeLogros(usuario?.logros);
  await generarHistorialLogros(usuario?.logros);
}

cargarDatos();
