import Fastify, { FastifyInstance } from "fastify";

const port: number = parseInt(process.env.APP_PORT!) || 3000;

const server: FastifyInstance = Fastify({
    logger: true,
});


// Run the server!
const start = async () => {
    try {
        await server.listen({ port: port })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start();