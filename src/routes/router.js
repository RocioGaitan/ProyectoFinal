import {Router} from 'express';
import jwt from 'jsonwebtoken';

export default class RouterBase {
    
    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        });
    }

    generateCustomResponses (req, res, next) {
        res.sendSuccess = payload => res.send({status: 'success', payload});
        res.sendServerError = error => res.status(500).send({status: 'error', error});
        res.sendClientError = error => res.status(400).send({status: 'error', error});

        next();
    }

    handlePolicies(policies) {
        return (req, res, next) => {
            if (policies[0] === 'PUBLIC') return next();

            const authHeaders = req.headers.authorization;
            if (!authHeaders) return res.status(401).send({status: 'error', error: 'Unauthorized'})

            const token = authHeaders.split(' ')[1];
            try {
                const user = jwt.verify(token, 'PasswordSecret');

                if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({status: 'error', error: 'Forbidden'});

                req.user = user;
                next();

            } catch (error) {
                res.status(500).send({
                    status: 'error',
                    error: error.message
                });
            }
            
        }
    }
}