let turistas = [
  { id: 1, nombre: 'Ana Pérez', email: 'ana@mail.com', telefono: '0991234567' },
  { id: 2, nombre: 'Luis Gómez', email: 'luis@mail.com', telefono: '0987654321' },
  { id: 3, nombre: 'Carla Ruiz', email: 'carla@mail.com', telefono: '0999999999' }
];
let siguienteId = 4;

function registrarTurista({ nombre, email, telefono }) {
  const nuevoTurista = {
    id: siguienteId++,
    nombre,
    email,
    telefono
  };
  turistas.push(nuevoTurista);
  return nuevoTurista;
}

function listarTuristas() {
  return turistas;
}

function obtenerTurista(id) {
  return turistas.find(t => t.id === id);
}

function actualizarTurista(id, { nombre, email, telefono }) {
  const turista = obtenerTurista(id);

  if (!turista) {
    return false;
  }

  turista.nombre = nombre;
  turista.email = email;
  turista.telefono = telefono;
  return true;
}

function eliminarTurista(id) {
  const indice = turistas.findIndex(t => t.id === id);

  if (indice === -1) {
    return false;
  }

  turistas.splice(indice, 1);
  return true;
}

module.exports = { registrarTurista, listarTuristas, obtenerTurista, actualizarTurista, eliminarTurista };