'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaUsuario = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    whatsapp: Number,
    calle: String,
    numero: Number,
    colonia: String,
    cp: Number,
    municipio: String,
    calles: String,
    referencias: String,
    password: String
    
    
});

module.exports = mongoose.model('Usuario', EsquemaUsuario);