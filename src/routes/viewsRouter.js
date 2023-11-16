import {Router} from 'express';

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

export default router;