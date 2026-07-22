const { listarDestinos } = require('./destinos');
const { listarPaquetes } = require('./paquetes');
const { listarReservas } = require('./reservas');
const { listarPagos } = require('./pagos');

function totalReservas() {
  return listarReservas().length;
}

function ingresosTotales() {
  return listarPagos()
    .filter(p => p.estado === 'aprobado')
    .reduce((total, p) => total + p.monto, 0);
}

function paqueteMasReservado() {
  const reservas = listarReservas();

  if (reservas.length === 0) {
    return null;
  }

  const conteo = {};
  reservas.forEach(r => {
    conteo[r.paqueteId] = (conteo[r.paqueteId] || 0) + 1;
  });

  const paqueteIdTop = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
  const paquete = listarPaquetes().find(p => p.id === Number(paqueteIdTop));

  return { paquete, totalReservas: conteo[paqueteIdTop] };
}

function resumenGeneral() {
  return {
    totalDestinos: listarDestinos().length,
    totalPaquetes: listarPaquetes().length,
    totalReservas: totalReservas(),
    ingresosTotales: ingresosTotales(),
    paqueteMasReservado: paqueteMasReservado()
  };
}

module.exports = { totalReservas, ingresosTotales, paqueteMasReservado, resumenGeneral };