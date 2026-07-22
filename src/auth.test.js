const { registrarUsuario, login, verificarToken, listarUsuarios } = require('./auth');

describe('Auth', () => {

  test('login devuelve un token y datos del usuario con credenciales correctas', () => {
    const resultado = login({ email: 'admin@turismo.com', password: 'admin123' });

    expect(resultado).not.toBeNull();
    expect(resultado).toHaveProperty('token');
    expect(resultado.usuario.rol).toBe('administrador');
  });

  test('login devuelve null con credenciales incorrectas', () => {
    const resultado = login({ email: 'admin@turismo.com', password: 'incorrecta' });

    expect(resultado).toBeNull();
  });

  test('verificarToken devuelve el usuario si el token es válido', () => {
    const { token } = login({ email: 'admin@turismo.com', password: 'admin123' });

    const usuario = verificarToken(token);

    expect(usuario).not.toBeNull();
    expect(usuario.email).toBe('admin@turismo.com');
  });

  test('verificarToken devuelve null si el token no existe', () => {
    const usuario = verificarToken('token-falso-123');

    expect(usuario).toBeNull();
  });

  test('registrarUsuario agrega un nuevo usuario sin exponer el password', () => {
    const usuario = registrarUsuario({ email: 'operador1@turismo.com', password: 'clave123' });

    expect(usuario).toHaveProperty('id');
    expect(usuario.rol).toBe('operador');
    expect(usuario.password).toBeUndefined();
  });

  test('listarUsuarios devuelve un arreglo sin exponer passwords', () => {
    const usuarios = listarUsuarios();

    expect(Array.isArray(usuarios)).toBe(true);
    expect(usuarios[0].password).toBeUndefined();
  });

});