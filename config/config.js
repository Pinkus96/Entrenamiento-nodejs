// ==============================
//  Puerto
// ==============================
process.env.PORT = process.env.PORT || 3000;

// ==============================
//  Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";


// ==============================
//  Vencimiento del Token
// ==============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = "48h";

// ==============================
//  SEED de autenticación
// ==============================
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

cfg = {
    rethinkdb: {
        host: 'localhost',
        port: 28015,
        authKey: '',
        db: 'entrenamiento'
    },
    developerMode: true,
    proyectName: "pruebas"
};

module.exports = {
    cfg
};