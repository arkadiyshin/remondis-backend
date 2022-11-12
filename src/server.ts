import Fastify, { FastifyInstance } from "fastify";
import app from './app.js';
import { APP_PORT } from "./configuration.js";

const server: FastifyInstance = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        destination: 1,
        colorize: true,
        translateTime: "HH:MM:ss.l",
        ignore: "pid,hostname",
      },
    },
  },
});

server.register(app, {} );

// Run the server!
const port: number = parseInt(APP_PORT!) || 3000;
const start = async () => {
  try {
    await server.listen({ port: port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
