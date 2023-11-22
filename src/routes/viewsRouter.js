import {Router} from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', (req, res) => {

    res.render(
        'login',
        {
            title: 'Login',
            style: 'index.css',
            script: 'index.js'
        }
    );
});

router.get('/private', auth, (req, res) => {

    res.render(
        'index',
        {
            title: 'Index',
            style: 'index.css',
            script: 'index.js',
            user: {
                first_name: 'Rocio',
                last_name: 'Gaitan',
                email: req.user.email
            }
        }
    );
});

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            message: 'Not authenticated'
        });
    }
    const token = authHeader.split(' ')[1]; //Remove "Bearer"
    console.log(token);
    jwt.verify(token, 'CoderSecretPass', (error, credentiales) => {
        if (error) {
            return res.status(403).send({
                message: 'Not authenticated'
            });
        }
        req.user = credentiales;
        console.log(req.user);
        next();
    });
}

export default router;




/*import {Router} from 'express';

const router = Router();

router.get("/", auth, async (req, res) => {

    res.render(
        'index',
        {
            title: "index",
            style: "index.css",
            user: req.session.user
        }
    );
});

router.get("/login", logged, async (req, res) => {

    res.render(
        'login',
        {
            title: "Login",
            style: "index.css",
            loginFailed: req.session.loginFailed ?? false,
            registerSuccess: req.session.registerSuccess ?? false
        }
    );
});

function auth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

function logged(req, res, next) {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
}


//ruta para renderizar el formulario de registro
router.get("/register", logged, async (req, res) => {
    res.render(
        'register',
        {
            title: "Register",
            style: "index.css",
            registerFailed: req.session.registerFailed ?? false

        }
    );
});

export default router;*/