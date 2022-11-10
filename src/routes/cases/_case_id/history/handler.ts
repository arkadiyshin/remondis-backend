import { FastifyReply, FastifyRequest, type RouteHandler } from "fastify";


export const getCaseHistoryHandler: RouteHandler<{}> = async function (req, reply) {
    reply.code(200).send('Here will be history')
};