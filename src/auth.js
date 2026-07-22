const bcrypt = require('bcryptjs');

let usuarios = [
  { id: 1, email: 'admin@turismo.com', password: bcrypt.hashSync('admin123', 10), rol: 'administrador' }
];
let siguienteId = 2;
let tokensActivos = {}; // token -> usuario

function registrarUsuario({ email, password, rol }) {
  const nuevoUsuario = {
    id: siguienteId++,
    email,
    password: bcrypt.hashSync(password, 10),
    rol: rol || 'operador'
  };
  usuarios.push(nuevoUsuario);
  return { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol };
}

function login({ email, password }) {
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
    return null;
  }

  const token = `token-${usuario.id}-${Date.now()}`;
  const usuarioPublico = { id: usuario.id, email: usuario.email, rol: usuario.rol };
  tokensActivos[token] = usuarioPublico;

  return { token, usuario: usuarioPublico };
}

function logout(token) {
  if (!tokensActivos[token]) {
    return false;
  }
  delete tokensActivos[token];
  return true;
}

function verificarToken(token) {
  return tokensActivos[token] || null;
}

function listarUsuarios() {
  return usuarios.map(u => ({ id: u.id, email: u.email, rol: u.rol }));
}

module.exports = { registrarUsuario, login, logout, verificarToken, listarUsuarios };