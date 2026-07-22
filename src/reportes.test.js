const { registrarDestino } = require('./destinos');
const { registrarPaquete } = require('./paquetes');
const { registrarReserva } = require('./reservas');
const { procesarPago } = require('./pagos');
const { totalReservas, ingresosTotales, paqueteMasReservado, resumenGeneral } = require('./reportes');

describe('Reportes', () => {

  test('totalReservas cuenta correctamente las reservas registradas', () => {
    const antes = totalReservas();
    registrarReserva({ turistaId: 1, paqueteId: 1, fecha: '2026-08-01', cantidadPersonas: 2 });

    expect(totalReservas()).toBe(antes + 1);
  });

  test('ingresosTotales suma solo los pagos aprobados', () => {
    const antes = ingresosTotales();
    procesarPago({ reservaId: 1, monto: 100, metodo: 'tarjeta' });
    procesarPago({ reservaId: 2, monto: 0, metodo: 'tarjeta' });

    expect(ingresosTotales()).toBe(antes + 100);
  });

  test('paqueteMasReservado identifica el paquete con más reservas', () => {
    const destino = registrarDestino({ nombre: 'Destino Reporte', ciudad: 'Ciudad Reporte' });
    const paquete = registrarPaquete({ nombre: 'Paquete Popular', precio: 50, destinoId: destino.id, cupos: 10 });

    registrarReserva({ turistaId: 1, paqueteId: paquete.id, fecha: '2026-08-01', cantidadPersonas: 1 });
    registrarReserva({ turistaId: 2, paqueteId: paquete.id, fecha: '2026-08-02', cantidadPersonas: 1 });
    registrarReserva({ turistaId: 3, paqueteId: paquete.id, fecha: '2026-08-03', cantidadPersonas: 1 });

    const resultado = paqueteMasReservado();

    expect(resultado.paquete.id).toBe(paquete.id);
  });

  test('resumenGeneral devuelve un objeto con todas las métricas', () => {
    const resumen = resumenGeneral();

    expect(resumen).toHaveProperty('totalDestinos');
    expect(resumen).toHaveProperty('totalPaquetes');
    expect(resumen).toHaveProperty('totalReservas');
    expect(resumen).toHaveProperty('ingresosTotales');
    expect(resumen).toHaveProperty('paqueteMasReservado');
  });

});