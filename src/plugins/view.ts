import fp from 'fastify-plugin'
import pointOfView from '@fastify/view';
//import * as ejs from 'ejs'

export default fp(async (app) => {
    // const {name, ...ejs} = require('ejs')
    // console.log(ejs)
    app.register(pointOfView, {
        engine: {
            ejs: require('ejs'),
        }
    });
    // app.register(require("@fastify/view"), {
    //     engine: {
    //       ejs: require("ejs"),
    //     },
    //   });

})
