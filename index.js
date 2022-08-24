import 'dotenv/config'
import "./database/connectdb.js"
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//Routes
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.routes.js'
import redirectRouter from './routes/redirect.route.js'

//Variables
const app = express();
const PORT = process.env.PORT || 5000
const whiteList = [process.env.ORIGIN1] 

//Middleware
app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback(`Error de CORS origin ${origin} No autorizado!`)
    }
}));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);

app.use('/', redirectRouter); // Ejemplo back redirect (opcional)

app.listen(PORT, () => console.log('🔥🔥🔥' + PORT))