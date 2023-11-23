import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import passport from 'passport';

//import sessionsRouter from './routes/sessionsRouter.js';
import userRouter from './routes/userRouter.js';
import sessionRouter from './routes/sessionsRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import {__dirname} from './utils/constantsUtil.js'
import initializePassport from './config/passportConfig.js';


const app = express();

const uri = 'mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/proyect?retryWrites=true&w=majority';
mongoose.connect(uri);

//servidor estatico
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//passport 
initializePassport();
app.use(passport.initialize());

//motor de plantillas handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/users', userRouter);
app.use('/api/session', sessionRouter);

/*const usersRouter = new UserRouter();
app.use('/users', usersRouter.getRouter());

const sessionsRouter = new SessionRouter();
app.use('/session', sessionsRouter.getRouter());*/


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});