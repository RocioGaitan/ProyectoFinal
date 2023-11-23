import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.get('/current', (req, res, next) => {passport.authenticate('jwt', function(err, user, info) {
   if (err) return next(err);
   if(!user) {
    return res.status(401).send({
        error: info.message ? info.message : info.toString()
    })
   }

   req.user = user;
   next();
}) (req, res, next)} , (req, res) => {
    
    res.send({
        status: 'success',
        payload: req.user
    });
}
)

router.get('/failLogin', (req, res) => {
    res.send({
        status: 'error',
        message: 'Login fallido'
    });
});

export default router;
/*import RouterBase from "./router.js";
import jwt from "jsonwebtoken";

export default class SessionRouter extends RouterBase {
  init() {
    this.post('/login', ['PUBLIC'], (req, res) => {
    
    const {name, email, role} = req.body; //query params
    //firmar token
    const token = jwt.sign({name, email, role}, 'PasswordSecret');

    res.sendSuccess(token);
   });
  }
}*/












/*import {Router} from 'express';
import passport from 'passport';
import userModel from '../models/userModel.js';

const router = Router();


//autenticacion de github
router.get("/github", passport.authenticate('github', {scope: ['user:username']}), (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
});

//ruta para manejar el retorno a github
router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.post("/register", async (req, res) => {
    try {
        await userModel.createUser(req.body);
        req.session.registerSuccess = true;
        res.redirect("/login");
    } catch (error) {
        req.session.registerFailed = true;
        res.redirect("/register");
    }
});



export default router;*/
