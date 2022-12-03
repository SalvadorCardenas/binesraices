import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express()

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }))

//Habilitar Cookie Parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({cookie: true}))

//Conexion a la bse de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta a la Base de Datos')
} catch (error) {
    console.log(error)
}

// Routing
app.use('/auth', usuarioRoutes)

//Hablitar pug
app.set('view engine', 'pug')
app.set('views', './view')

//Carpeta publica
app.use(express.static('public'))

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});