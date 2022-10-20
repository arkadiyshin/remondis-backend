import type { FastifyInstance } from "fastify";
import {
  newUserSchema,
  newUserExtendedSchema,
  userFullSchema,
  getUserSchema,
  getUsersSchema,
  createNewUserSchema,
  confirmNewUserSchema,
  updateUserSchema,
  forgotPassSchema,
  setNewPassSchema,
  deleteUserSchema,
} from "./schema.js";
import {
  getUserHandler,
  getUsersHandler,
  createUserHandler,
  confirmedUserHandler,
  updateUserHandler,
  forgotPassHandler,
  setNewPassHandler,
  deleteUserHandler,
} from "./handler.js";
import { appendFile } from "fs";
export default async (app: FastifyInstance) => {
  app.addSchema(newUserSchema);
  app.addSchema(newUserExtendedSchema);
  app.addSchema(userFullSchema);

  app.get('/', {schema: getUsersSchema}, getUsersHandler )
  app.get('/:id', {schema: getUserSchema}, getUserHandler )
  app.post('/register', {schema: createNewUserSchema}, createUserHandler )
  app.put('/:id/confirm', {schema: confirmNewUserSchema}, confirmedUserHandler )
  app.put('/:id', {schema: updateUserSchema}, updateUserHandler )
  app.patch('/:id/forgotPassword/', {schema: forgotPassSchema}, forgotPassHandler )
  app.patch('/:id/setNewPassword/', {schema: setNewPassSchema}, setNewPassHandler )
  app.delete('/:id/', {schema: deleteUserSchema}, deleteUserHandler )
};





