var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/sistemapizza', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("conexión exitosa");
        app.listen(port, function() {
            console.log("Servidor de api rest de musica eschuando en http://localhost:" + port);
        });

    }
})
