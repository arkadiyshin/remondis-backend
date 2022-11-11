import { type RouteHandler, FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', testHandler);
}


export const testHandler: RouteHandler<{}> = async function (req, reply) {
    reply.send({ success: true, message: 'Success'});
}

export default root