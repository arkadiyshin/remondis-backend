"use strict";


// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../src/app.js"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}
/* import * as dotenv from "dotenv";
dotenv.config();
import Fastify, { FastifyInstance } from "fastify";

import type { VercelRequest, VercelResponse } from '@vercel/node';

const server: FastifyInstance = Fastify({
  logger: true,
});

server.register(import("../src/app.js"), {} );

export default async function (req: VercelRequest, res: VercelResponse) {
  //await server.ready();
  const { name = 'World' } = req.query;
  res.send(`Hello ${name}!`);
  //server.server.emit('request', req, res);
  /* const { name = 'World' } = req.query;
  res.send(`Hello ${name}!`);
} */
