import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} from "../configuration.js"
import nodemailer, { TransportOptions } from "nodemailer";


const transportPlugin: FastifyPluginAsync = fp(async (server, options) => {
    
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: (SMTP_PORT === 465), // true for 465, false for other ports
        auth: {
            user: SMTP_USER, 
            pass: SMTP_PASS, 
        },
    });

    // Make SMTP transport available through the fastify server instance: server.transporter
    server.decorate('transporter', transporter)

    /*
    // EXAMPLE: send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <noreply@remondis.com>', // sender address
        to: "user@remondis.com", // list of receivers
        subject: "Please verify your email address", // Subject line
        text: "", // plain text body
        html: "", // html body
    });
     */
})

export default transportPlugin;