import fp from 'fastify-plugin'
import jwt from '@fastify/jwt';
import { JWT_SECRET_KEY } from "../configuration";


export default fp(async (app) => {

    app.register(jwt, {
        secret: JWT_SECRET_KEY,
    });

})