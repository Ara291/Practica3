'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaProducto = Schema({
    nombre: String,
    categoria: String,
    tamaño: String,
    descripcion: Number,
    imagen: String,
    precio: Number,
    usuario: { type: Schema.ObjectId, ref:"Usuario"}
});

module.exports = mongoose.model('Producto', EsquemaProducto);