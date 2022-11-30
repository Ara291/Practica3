'use strict'
const bcrypt = require('bcrypt');
// const usuario = require('../modelo/usuario');
// var bcrypt = require('bcrypt');
// const usuario = require('../modelo/usuario');
var usuarioModelo = require('../modelo/usuario');
var usuario = new usuarioModelo();

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
    });
}

function registrarUsuario(req, res) {
    // var usuario = new usuarioModelo();

    var params = req.body; //recibe todos los datos por POST
    console.log(params);

    usuario.nombre = params.nombre
    usuario.apellidos = params.apellidos
    usuario.email = params.email
    usuario.whatsapp = params.whatsapp
    usuario.calle = params.calle
    usuario.numero = params.numero
    usuario.colonia = params.colonia
    usuario.cp = params.cp
    usuario.municipio = params.municipio
    usuario.calles = params.calles
    usuario.referencias = params.referencias
    usuario.password = params.password

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellidos != null && usuario.email != null && usuario.whatsapp != null && usuario.calle != null && usuario.numero != null && usuario.colonia != null && usuario.cp != null && usuario.municipio != null && usuario.calles != null && usuario.referencias  != null ) {
                //guardar el ususario en BD
                usuario.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                        } else {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ usuario: usuarioAlmacenado });
                        }
                    }

                });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });

    } else {
        res.status(500).send({ mesagge: 'Introduce la contraseña' });
    }


}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    

    usuarioModelo.findOne({ email: email}, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else { 
            if (!user) {
                       res.status(404).send({ mesagge: 'El usuario no existe' });
                   } else {
                       bcrypt.compare(password, usuario.password, function(err, check) {
                           if (check) {
                               //devolver los datos del ususario logeado
                               console.log('coincide el password')
                               if (params.gethash) {
                                   //devolver un token de jwt
                               } else {
                                   res.status(200).send({ user: user });
                               }
                           } else {
                               res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                           }
                       });
                   }
       

        }
    }); 

}

module.exports = {
    prueba, registrarUsuario,accesoUsuario
};




