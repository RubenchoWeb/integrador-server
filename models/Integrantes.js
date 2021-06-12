const mongoose = require('mongoose')

const IntegrantesSchema = new mongoose.Schema({
    nombreIntegrante: {
        type: String,
        require: true,
    },
    codigoIntegrante: {
        type: Number,
        require: true,
    },
    rolIntegrante: {
        type: String,
        require: true,
    },
});

const Integrantes = mongoose.model("Integrantes", IntegrantesSchema);

module.exports = Integrantes;