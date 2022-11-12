import fp from 'fastify-plugin'
import * as sgMail from '@sendgrid/mail';
import type { MailService } from '@sendgrid/mail';
import { FastifyPluginAsync } from 'fastify';
import { SENDGRID_API_KEY } from '../configuration';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
    interface FastifyInstance {
        sgMail: MailService,
    }
}

const sendgridPlugin: FastifyPluginAsync = fp(async (server, options) => {

    sgMail.setApiKey(SENDGRID_API_KEY);
    server.decorate('sgMail', sgMail)

})

export default sendgridPlugin

/**
 * Example 
const msg = {
    to: 'test@test.com', // Change to your recipient
    from: 'noreplay.remondis@gmail.com', // Change to your verified sender
    subject: 'confirm email',
    text: 'url with token',
    html: '<strong>url with token</strong>',
}
try {
    const result = await sgMail.send(msg);
    console.log('Email sended')
} catch (error) {
    console.log('Email not sended')
}
 */
