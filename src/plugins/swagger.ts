import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';


export default fp<FastifyDynamicSwaggerOptions>(async (app) => {
    app.register(swagger);
})