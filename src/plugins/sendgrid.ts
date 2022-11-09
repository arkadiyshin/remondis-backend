import fp from 'fastify-plugin'
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../configuration.js';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';




const sendgridPlugin: FastifyPluginAsync = fp(async (server, options) => {

    sgMail.setApiKey(SENDGRID_API_KEY);
    server.decorate('sgMail', sgMail)

    // const msg = {
    //     to: 'arkadiy.shim@gmail.com', // Change to your recipient
    //     from: 'noreplay.remondis@gmail.com', // Change to your verified sender
    //     subject: 'Sending with SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
})

export default sendgridPlugin