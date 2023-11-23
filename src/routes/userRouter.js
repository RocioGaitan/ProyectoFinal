import { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { validatePassword } from "../utils/cryptoUtil.js";
import { SECRET_JWT, KEY_COOKIE } from "../utils/constantsUtil.js";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const result = await userModel.create(req.body);

        res.send({
            status: 'success',
            payload: result
        });
    } catch(error) {
        res.send({
            status: 'error',
            payload: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const result = await userModel.findOne({email});
        console.log(result);

        if (!result) throw new Error('Login error');

        if (!validatePassword(result, password)) throw new Error('Login error');

        const user = {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            age: result.age
        }

        const token = jwt.sign(user, SECRET_JWT, {expiresIn: '1h'});
        
        res.cookie(KEY_COOKIE, token, {maxAge: 60*60*1000}).send({
         status: 'success',
         token   
        });
    } catch(error) {
        res.send({
            status: 'error',
            payload: error.message
        });
    }
});

export default router;


/*export default class UserRouter extends RouterBase {
    init() {
        //ruta publica
        this.get('/', ['PUBLIC'], (req, res) => {
            res.sendSuccess('Hola Bienvenido!');
        });

        //ruta privada
        this.get('/private', ['ADMIN', 'USER_PREMIUM'], (req, res) => {
            res.sendSuccess(`Bienvenido ${req.user.name}!`);
        });

        this.get('/current', ['USER', 'USER_PREMIUM'], (req, res) => {
            res.sendSuccess(req.user); //retorna todo el usuario
        });
    }
}*/







/*import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { passportCall } from '../utils/authUtil.js';
import { authorization } from '../middlewares/auth.js';

const router = Router();

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return req.status(401).send({
            status: 'Unauthorized'
        });
    }

    //firmar jwt
    const token = jwt.sign({email, password, role: 'user'}, 'coderSecret', {expiresIn: '24h'});

    res.cookie('coderCookieToken', token, {
        maxAge: 60*60*1000
    }).send({
        status: 'success',
        message: 'Logged in!'
    });
});

//estrategia passport
router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
    res.send(req.user);
});

export default router;*/