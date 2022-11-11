import app from './app.js';
import {APP_PORT} from "./configuration.js";


// Run the server!
const port: number = parseInt(APP_PORT!) || 3000;
const start = async () => {
  try {
    await app.listen({ port: port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
