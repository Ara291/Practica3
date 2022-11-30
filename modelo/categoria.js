'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaCategoria = Schema({
    nombre: String,
    descripcion: String,
   producto: { type: Schema.ObjectId, ref:"Producto"}
});

module.exports = mongoose.model('Categoria', EsquemaCategoria);