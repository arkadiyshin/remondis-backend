import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASS} from "../configuration.js"
import nodemailer from "nodemailer";


const transportPlugin: FastifyPluginAsync = fp(async (server, options) => {
    
    const transporter = nodemailer.createTransport({
        host: SMTP_SERVER,
        port: SMTP_PORT,
        secure: (SMTP_PORT === 465), // true for 465, false for other ports
        auth: {
            user: SMTP_USER, 
            pass: SMTP_PASS, 
        },
    });

    // Make SMTP transport available through the fastify server instance: server.transporter
    server.decorate('transporter', transporter)

})

export default transportPlugin;