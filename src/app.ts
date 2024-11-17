import cors from 'cors';
import express from 'express';
import http from 'http';
import "reflect-metadata";
import { Server } from 'socket.io';
import { AppDataSource } from './presentation/data-source';
import { AppRoutes } from "./presentation/routes/routes";

AppDataSource.initialize();

const port = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);  // Crear el servidor con http
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "*", // Permitir todas las conexiones. Ajustar según sea necesario.
        methods: ["GET", "POST"]
    }
});

app.use(cors());  // Habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat_message', (msg) => {
        console.log(msg);
        io.emit('chat_message', msg);  // Enviar mensaje a todos los clientes conectados
    });
});

app.post('/mensaje_nuevo', (req, res) => {
    console.log(req.body);

    io.emit('nuevo_mensaje', req.body);
    res.status(200).json({ message: 'Mensaje recibido y enviado' });

});

app.use(AppRoutes.routes);

server.listen(port, () => {  // Cambiar de app.listen a server.listen
    console.log(`Server running on port ${port}`);
});

export { io };

