import path, { join } from "path";
import { fileURLToPath } from "url";
import Fastify, { FastifyInstance } from "fastify";
import fs from "fs";

// read about autoload options here https://github.com/fastify/fastify-autoload
import autoLoad from "@fastify/autoload";

// this code fixed error: "__dirname is not defined in ES module scope"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

app.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

const bufferPicture = async () => {
  await fs.readFile("./assets/photo_for_db.jpeg", function read(err, data) {
    if (err) {
      throw err;
    }
    return data;
  });
};

console.log(app.prisma);

app.prisma.casePhoto.create({
  data: {
    photo: Buffer.from(bufferPicture),
  },
});

// Run the server!
const port: number = parseInt(process.env.APP_PORT!) || 3000;
const start = async () => {
  try {
    await app.listen({ port: port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
