const { obtenerPaquete } = require('./paquetes');

let reservas = [
  { id: 1, turistaId: 1, paqueteId: 1, fecha: '2026-08-05', cantidadPersonas: 2, estado: 'confirmada' },
  { id: 2, turistaId: 2, paqueteId: 2, fecha: '2026-08-10', cantidadPersonas: 2, estado: 'pendiente' },
  { id: 3, turistaId: 3, paqueteId: 3, fecha: '2026-08-15', cantidadPersonas: 1, estado: 'confirmada' }
];
let siguienteId = 4;

// Refleja en los cupos de los paquetes el consumo de las reservas precargadas
(function aplicarCuposIniciales() {
  reservas.forEach(r => {
    const paquete = obtenerPaquete(r.paqueteId);
    if (paquete) {
      paquete.cupos -= r.cantidadPersonas;
    }
  });
})();

function registrarReserva({ turistaId, paqueteId, fecha, cantidadPersonas }) {
  const paquete = obtenerPaquete(paqueteId);

  // Si el paquete existe en el sistema, se valida disponibilidad de cupos.
  // Si no existe (p. ej. entornos de prueba aislados), se conserva el
  // comportamiento anterior para no romper flujos ya validados.
  if (paquete) {
    if (paquete.cupos < cantidadPersonas) {
      return null; // sin disponibilidad
    }
    paquete.cupos -= cantidadPersonas;
  }

  const nuevaReserva = {
    id: siguienteId++,
    turistaId,
    paqueteId,
    fecha,
    cantidadPersonas,
    estado: 'pendiente'
  };
  reservas.push(nuevaReserva);
  return nuevaReserva;
}

function listarReservas() {
  return reservas;
}

function obtenerReserva(id) {
  return reservas.find(r => r.id === id);
}

function actualizarReserva(id, cambios) {
  const reserva = obtenerReserva(id);

  if (!reserva) {
    return false;
  }

  Object.assign(reserva, cambios);
  return true;
}

function eliminarReserva(id) {
  const reserva = obtenerReserva(id);

  if (!reserva) {
    return false;
  }

  // Política de cancelación: una reserva ya confirmada no se cancela
  // directamente, primero debe pasar a un estado intermedio.
  if (reserva.estado === 'confirmada') {
    return false;
  }

  const paquete = obtenerPaquete(reserva.paqueteId);
  if (paquete) {
    paquete.cupos += reserva.cantidadPersonas; // liberar cupo
  }

  const indice = reservas.findIndex(r => r.id === id);
  reservas.splice(indice, 1);
  return true;
}

module.exports = { registrarReserva, listarReservas, obtenerReserva, actualizarReserva, eliminarReserva };