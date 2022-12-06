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