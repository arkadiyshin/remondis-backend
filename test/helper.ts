import Fastify, { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import app from '../src/app';

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {};
}

function build() {

  const testApp: FastifyInstance = Fastify();

  beforeAll(
    async () => {
      testApp.register(fp(app), await config());
      await testApp.ready();
    }
  );

  afterAll(() => testApp.close());

  return testApp;
}

export { config, build };