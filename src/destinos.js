let destinos = [
  { id: 1, nombre: 'Baños de Agua Santa', ciudad: 'Baños' },
  { id: 2, nombre: 'Islas Galápagos - Santa Cruz', ciudad: 'Puerto Ayora' },
  { id: 3, nombre: 'Bosque Nuboso de Mindo', ciudad: 'Mindo' },
  { id: 4, nombre: 'Mercado Artesanal de Otavalo', ciudad: 'Otavalo' }
];
let siguienteId = 5;

function registrarDestino({ nombre, ciudad }) {
  const nuevoDestino = {
    id: siguienteId++,
    nombre,
    ciudad
  };
  destinos.push(nuevoDestino);
  return nuevoDestino;
}

function listarDestinos() {
  return destinos;
}

function obtenerDestino(id) {
  return destinos.find(d => d.id === id);
}

function eliminarDestino(id) {
  const indice = destinos.findIndex(d => d.id === id);

  if (indice === -1) {
    return false;
  }

  destinos.splice(indice, 1);
  return true;
}

function actualizarDestino(id, { nombre, ciudad }) {
  const destino = obtenerDestino(id);

  if (!destino) {
    return false;
  }

  destino.nombre = nombre;
  destino.ciudad = ciudad;
  return true;
}

module.exports = { registrarDestino, listarDestinos, obtenerDestino, eliminarDestino, actualizarDestino };