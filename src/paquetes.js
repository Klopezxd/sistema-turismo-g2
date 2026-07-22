let paquetes = [
  { id: 1, nombre: 'Aventura en Baños', precio: 150, destinoId: 1, cupos: 20 },
  { id: 2, nombre: 'Galápagos Explorer', precio: 1200, destinoId: 2, cupos: 10 },
  { id: 3, nombre: 'Mindo Naturaleza y Aves', precio: 90, destinoId: 3, cupos: 25 },
  { id: 4, nombre: 'Otavalo Cultura Viva', precio: 60, destinoId: 4, cupos: 30 }
];
let siguienteId = 5;

function registrarPaquete({ nombre, precio, destinoId, cupos }) {
  const nuevoPaquete = {
    id: siguienteId++,
    nombre,
    precio,
    destinoId,
    cupos
  };
  paquetes.push(nuevoPaquete);
  return nuevoPaquete;
}

function listarPaquetes() {
  return paquetes;
}

function obtenerPaquete(id) {
  return paquetes.find(p => p.id === id);
}

function actualizarPaquete(id, { nombre, precio, destinoId, cupos }) {
  const paquete = obtenerPaquete(id);

  if (!paquete) {
    return false;
  }

  paquete.nombre = nombre;
  paquete.precio = precio;
  paquete.destinoId = destinoId;
  paquete.cupos = cupos;
  return true;
}

function eliminarPaquete(id) {
  const indice = paquetes.findIndex(p => p.id === id);

  if (indice === -1) {
    return false;
  }

  paquetes.splice(indice, 1);
  return true;
}

module.exports = { registrarPaquete, listarPaquetes, obtenerPaquete, actualizarPaquete, eliminarPaquete };