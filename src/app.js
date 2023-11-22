import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import mongoose from "mongoose";
import mongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import passport from 'passport';


//import sessionsRouter from './routes/sessionsRouter.js';
import userRouter from './routes/userRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';
import initializePassport from './config/passportConfig.js';

const app = express();

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

const uri = 'mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/newproyect?retryWrites=true&w=majority';
mongoose.connect(uri);





//rutas
app.use('/', viewsRouter);
app.use('/api/user', userRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});