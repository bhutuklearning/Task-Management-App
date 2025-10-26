import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todos.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';
import path from "path";
import { fileURLToPath } from 'url';


dotenv.config();
connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


// Pinging the server to keep it awake
// Endpoint to ping
app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

// Function to ping the server every 5 minutes
function pingServer() {
    const url = `${process.env.BACKEND_URL}/ping` || `http://localhost:${process.env.PORT}/ping`;
    axios.get(url)
        .then(() => console.log('Pinged server at', new Date().toLocaleString()))
        .catch(err => console.error('Error pinging server:', err.message));
}

// Ping every 10 minutes (600,000 milliseconds)
setInterval(pingServer, 600000);

app.get('/health', (req, res) => {
    res.send('OK');
});

app.use(errorHandler);


// if (process.env.NODE_ENV === "development") {
//     app.use(express.static(path.join(__dirname, "../frontend")));

//     // app.get('*', (req, res) => {
//     //     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
//     // });


//     // app.get('/health', (req, res) => {
//     //     res.send('OK');
//     // });

// }




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});