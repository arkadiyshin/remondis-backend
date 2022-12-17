/* "use strict";

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
app.register(import("../app.js"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
} */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;
  res.send(`Hello ${name}!`);
}
