import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';

import productsRouter from './routes/products.routes.js';
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from './routes/views.routes.js';
import sessionRouter from "./routes/session.routes.js"

import { Server } from "socket.io";
import session from "express-session";
import { initializePassport } from "./config/passpot.config.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";
import envsConfig from './config/envs.config.js';



const app = express();


connectMongoDB();
initializePassport();

const PORT = process.env.PORT||8080;

const server = app.listen(envsConfig.PORT,()=>console.log(`Listening on ${envsConfig.PORT}`));

app.engine('handlebars',handlebars.engine({runtimeOptions:{allowProtoPropertiesByDefault:true}}));
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');


app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    session({
      secret: envsConfig.SECRET_KEY,
      resave: true, // Mantiene la session activa, si esto est el false la session se cierra
      saveUninitialized: true, // Guarde la session
    })
  );

app.use(cookieParser(envsConfig.SECRET_KEY))

app.use('/',viewsRouter);
app.use('/api/products',productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/sessions", sessionRouter);

// Configuramos socket
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});




