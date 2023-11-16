import {Router} from 'express';
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



export default router;


/* Middleware de autenticación para proteger ciertas rutas
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); 
  };*/
  


/* Ruta protegida que requiere autenticación
router.get("/profile", isAuthenticated, (req, res) => {
    res.send({
      user: req.session.user,
      message: 'Profile page'
    });
  });*/