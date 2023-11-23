import passport from 'passport';
import jwt, { ExtractJwt } from 'passport-jwt';

import { SECRET_JWT, KEY_COOKIE } from '../utils/constantsUtil.js';

const JWTStratergy = jwt.Strategy;

const initializatePassport = () => {
    passport.use(
        'jwt',
        new JWTStratergy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: SECRET_JWT
            },
            async (jwt_payload, done) => {
                try {
                    console.log(jwt_payload);
                    return done(null, jwt_payload);
                } catch (err) {
                    return done(err);
                }
            }
        )
    )
}

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[KEY_COOKIE] ?? null;
    }

    return token;
}

export default initializatePassport;