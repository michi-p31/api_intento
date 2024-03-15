const express = require('express');
const app = express();
const morgan = require('morgan');

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const pokemon = require("./routes/pokemon");
app.use ('/api/', pokemon);

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
