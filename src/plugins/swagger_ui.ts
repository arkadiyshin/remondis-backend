import fp from 'fastify-plugin';
import swaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';


export default fp<FastifySwaggerUiOptions>(async (app) => {

    app.register(
        swaggerUi, <FastifySwaggerUiOptions>{
            uiConfig: {
                //docExpansion: 'full',
                deepLinking: false
            },
            hideUntagged: true,
            routePrefix: '/docs',
            staticCSP: true,
        })

})

/* 
routePrefix: '/documentation',
  initOAuth: { },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header 
  */