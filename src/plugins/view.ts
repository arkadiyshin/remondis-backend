import fp from 'fastify-plugin'
import pointOfView from '@fastify/view';

export default fp(async (app) => {
    
    app.register(pointOfView, {
        engine: {
            ejs: require('ejs'),
        }
    });

})
