import Dexie from 'dexie'

export const db = new Dexie('brucat_bitacora_db')

// Versión 1 del esquema
// Índices para búsquedas: fecha, metodo, cafe, puntaje
// id autoincremental

db.version(1).stores({
  extractions: '++id, fecha, metodo, cafe, puntaje'
})

// Modelo de ejemplo:
// {
//   fecha: ISOString,
//   metodo: 'Moka' | 'V60' | 'Kalita' | 'Goteo' | 'Otro',
//   molino: 'M1 Race',
//   molienda: number, // ajuste numerado
//   gramosCafe: number,
//   gramosAgua: number,
//   ratio: string, // ej: 1:15
//   temperatura: number,
//   tiempoTotal: number, // en segundos
//   cafe: string, // nombre/origen
//   tueste: string,
//   fechaTueste: string, // ISO
//   puntaje: number, // 0-10
//   notas: string,
//   resultado: 'OK' | 'Ajustar'
// }
