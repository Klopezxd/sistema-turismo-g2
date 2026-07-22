const express = require('express');
const { registrarDestino, listarDestinos, obtenerDestino, eliminarDestino, actualizarDestino } = require('./src/destinos');
const { registrarTurista, listarTuristas, obtenerTurista, actualizarTurista, eliminarTurista } = require('./src/turistas');
const { registrarPaquete, listarPaquetes, obtenerPaquete, actualizarPaquete, eliminarPaquete } = require('./src/paquetes');
const { registrarReserva, listarReservas, obtenerReserva, actualizarReserva, eliminarReserva } = require('./src/reservas');
const { procesarPago, listarPagos, obtenerPago } = require('./src/pagos');
const { registrarUsuario, login, logout, verificarToken, listarUsuarios } = require('./src/auth');
const { resumenGeneral } = require('./src/reportes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Middleware de autenticación
function requiereAuth(req, res, next) {
  const token = req.headers['authorization'];
  const usuario = verificarToken(token);
  if (!usuario) return res.status(401).json({ error: 'No autenticado' });
  req.usuario = usuario;
  next();
}

// Destinos
app.get('/destinos', (req, res) => {
  res.json(listarDestinos());
});

app.post('/destinos', requiereAuth, (req, res) => {
  const nuevo = registrarDestino(req.body);
  res.status(201).json(nuevo);
});

app.get('/destinos/:id', (req, res) => {
  const destino = obtenerDestino(Number(req.params.id));
  if (!destino) return res.status(404).json({ error: 'Destino no encontrado' });
  res.json(destino);
});

app.put('/destinos/:id', requiereAuth, (req, res) => {
  const actualizado = actualizarDestino(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: 'Destino no encontrado' });
  res.json({ mensaje: 'Destino actualizado' });
});

app.delete('/destinos/:id', requiereAuth, (req, res) => {
  const eliminado = eliminarDestino(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Destino no encontrado' });
  res.json({ mensaje: 'Destino eliminado' });
});

// Turistas
app.get('/turistas', (req, res) => {
  res.json(listarTuristas());
});

app.post('/turistas', (req, res) => {
  const nuevo = registrarTurista(req.body);
  res.status(201).json(nuevo);
});

app.get('/turistas/:id', (req, res) => {
  const turista = obtenerTurista(Number(req.params.id));
  if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
  res.json(turista);
});

app.put('/turistas/:id', (req, res) => {
  const actualizado = actualizarTurista(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: 'Turista no encontrado' });
  res.json({ mensaje: 'Turista actualizado' });
});

app.delete('/turistas/:id', requiereAuth, (req, res) => {
  const eliminado = eliminarTurista(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Turista no encontrado' });
  res.json({ mensaje: 'Turista eliminado' });
});

// Paquetes
app.get('/paquetes', (req, res) => {
  res.json(listarPaquetes());
});

app.post('/paquetes', requiereAuth, (req, res) => {
  const nuevo = registrarPaquete(req.body);
  res.status(201).json(nuevo);
});

app.get('/paquetes/:id', (req, res) => {
  const paquete = obtenerPaquete(Number(req.params.id));
  if (!paquete) return res.status(404).json({ error: 'Paquete no encontrado' });
  res.json(paquete);
});

app.put('/paquetes/:id', requiereAuth, (req, res) => {
  const actualizado = actualizarPaquete(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: 'Paquete no encontrado' });
  res.json({ mensaje: 'Paquete actualizado' });
});

app.delete('/paquetes/:id', requiereAuth, (req, res) => {
  const eliminado = eliminarPaquete(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Paquete no encontrado' });
  res.json({ mensaje: 'Paquete eliminado' });
});

// Reservas
app.get('/reservas', (req, res) => {
  res.json(listarReservas());
});

app.post('/reservas', (req, res) => {
  const nueva = registrarReserva(req.body);
  if (!nueva) return res.status(409).json({ error: 'Sin cupos disponibles para el paquete' });
  res.status(201).json(nueva);
});

app.get('/reservas/:id', (req, res) => {
  const reserva = obtenerReserva(Number(req.params.id));
  if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.json(reserva);
});

app.put('/reservas/:id', (req, res) => {
  const actualizado = actualizarReserva(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: 'Reserva no encontrada' });
  res.json({ mensaje: 'Reserva actualizada' });
});

app.delete('/reservas/:id', (req, res) => {
  const eliminado = eliminarReserva(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Reserva no encontrada o no se puede cancelar' });
  res.json({ mensaje: 'Reserva eliminada' });
});

// Pagos
app.get('/pagos', (req, res) => {
  res.json(listarPagos());
});

app.post('/pagos', (req, res) => {
  const nuevo = procesarPago(req.body);
  res.status(nuevo.estado === 'aprobado' ? 201 : 402).json(nuevo);
});

app.get('/pagos/:id', (req, res) => {
  const pago = obtenerPago(Number(req.params.id));
  if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
  res.json(pago);
});

// Auth
app.post('/login', (req, res) => {
  const resultado = login(req.body);
  if (!resultado) return res.status(401).json({ error: 'Credenciales inválidas' });
  res.json(resultado);
});

app.post('/logout', requiereAuth, (req, res) => {
  const token = req.headers['authorization'];
  logout(token);
  res.json({ mensaje: 'Sesión cerrada' });
});

app.post('/usuarios', requiereAuth, (req, res) => {
  const nuevo = registrarUsuario(req.body);
  res.status(201).json(nuevo);
});

app.get('/usuarios', requiereAuth, (req, res) => {
  res.json(listarUsuarios());
});

// Reportes
app.get('/reportes/resumen', (req, res) => {
  res.json(resumenGeneral());
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});