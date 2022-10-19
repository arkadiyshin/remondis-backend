import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';


export default fp <FastifyDynamicSwaggerOptions>(async (app) => {
    
    app.register(
        swagger, <FastifyDynamicSwaggerOptions>{
            info: {
                title: 'REMONDIS API',
                description: 'Remondis API',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'case', description: 'Case related end-points' }
            ],
            // securityDefinitions: {
            //     apiKey: {
            //         type: 'apiKey',
            //         name: 'apiKey',
            //         in: 'header'
            //     }
            // }
        
        })

})