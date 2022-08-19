
import routerProd from "./routes/productos.route.js";
import routerProdTest from "./routes/productosTest.route.js";
import routerCarrito from "./routes/carrito.route.js";
import routerUsuarios from "./routes/usuario.route.js";
import routerInfo from "./routes/info.route.js";
import routerRandoms from "./routes/randoms.route.js";
import routerSubir from "./routes/subir.route.js";
import routerGraphql from "./routes/graphql.route.js";
import express  from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketSrv } from 'socket.io';
import Mensajes from "./services/DAO/mensajeria.service.js";
import session from 'express-session';
import mongoStore from 'connect-mongo';
import 'dotenv/config';
import passport from "./utils/passport.util.js";
import compression from 'compression';
import logger from "./utils/logger.js";
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Server {
   constructor (port) {
      this.port = port;
      this.app = express();
      this.server = http.createServer(this.app);
      this.io = new SocketSrv(this.server, {
         cors: { origin: 'http://localhost:3000'}
      });
      this.msgsClass = new Mensajes();
      this.msgs = [];
   }
   async listen() {
      this.server = http.createServer(this.app);
      const srv = this.server.listen(this.port, () => {
          logger.info(`SERVER ON: http://localhost:${this.port}`)
       });  
      srv.on('error', (error) => {
         logger.error('**SERVER ERROR**', error);
      });    
   }
   async start() {          
      this.app.use(compression());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));

      this.app.use(morgan('dev'));
      this.app.use((req, res, next) => {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Credentials", "true");
         res.header(
           "Access-Control-Allow-Headers",
           "Origin, X-Requested-With, Content-Type, Accept, Authorization"
         );
         res.header(
           "Access-Control-Allow-Methods",
           "GET, POST, PUT, PATCH, DELETE, OPTIONS"
         );
         next();
      });
      const whiteList = ['http://localhost:3000']
      this.app.use(cors({origin: whiteList}));
      this.app.use(session({
         store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            },
         }),    
         secret: process.env.SECRET,
         resave: true,
         saveUninitialized: true,
         cookie: {
            httpOnly: true,
            maxAge: Number(process.env.EXPIRE),
            sameSite: false
         },
         rolling: true
      }));
      this.app.use(passport.initialize());
      this.app.use(passport.session());
      this.app.use("/api/subir", routerSubir);
      this.app.use("/api/productos", routerProd);     
      // this.app.use("/api/productos-test", routerProdTest);
      this.app.use("/api/carrito", routerCarrito);
      this.app.use("/api/usuario", routerUsuarios);
      this.app.use("/api/info", routerInfo);
      this.app.use("/api/randoms", routerRandoms);
      this.app.use("/api/graphql", routerGraphql);

      this.io.on('connection', async (socket) => {
         logger.info('Connected');
         socket.emit('Welcome !!', {
            msg: '- We´re live -'
         });
         msgs = await msgsClass.Mostrar();
         io.sockets.emit('mensajeBack', msgs)

         socket.on('disconnect', () => {
               logger.info('Diconnected');
               socket.emit('WELCOME', 'See you next time, bro' );
         });

         socket.on('notificacion', (data) => {
               logger.info(`Recibido: ${data}`);
         })

         socket.on('mensajeFront', async (data) => {
            msgsClass.guardarYMostrar(socket.id, data, (msgs) => {
               io.sockets.emit('mensajeBack', msgs);
            });
         })
      })

      this.app.use('*', (req, res) => {
         logger.warn(`${req.method}  - ${req.originalUrl} - NONEXISTENT.`);
         res.status(400).json({descripcion: `Route ${req.originalUrl} Nonexistent.`});
      });

      this.app.on('error', (error) => {
         logger.error(error);
      });
   }
}

export default Server;
