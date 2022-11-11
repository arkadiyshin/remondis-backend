import path, { join } from "path";
import { fileURLToPath } from "url";
import { FastifyPluginAsync } from "fastify";

// read about autoload options here https://github.com/fastify/fastify-autoload
import autoLoad, { AutoloadPluginOptions } from "@fastify/autoload";

// this code fixed error: "__dirname is not defined in ES module scope"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export type AppOptions = {
  
} & Partial<AutoloadPluginOptions>;


const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {

  fastify.register(autoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts
  });

  fastify.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
    routeParams: true
  });

};

export default app;