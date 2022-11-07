import type { FastifyInstance } from "fastify";
import {
	userNewSchema,
	userExtendedSchema,
	userSchema,
	getUserSchema,
	getUsersSchema,
	createUserSchema,
	confirmUserSchema,
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


export default async (app: FastifyInstance) => {

	app.addSchema(userNewSchema);
	app.addSchema(userExtendedSchema);
	app.addSchema(userSchema);

	app.get('/', { schema: getUsersSchema }, getUsersHandler)
	app.get('/:id', { schema: getUserSchema }, getUserHandler)
	app.post('/register', { schema: createUserSchema }, createUserHandler)
	app.put('/:id/confirm', { schema: confirmUserSchema }, confirmedUserHandler)
	app.put('/:id', { schema: updateUserSchema }, updateUserHandler)
	app.patch('/:id/forgotPassword/', { schema: forgotPassSchema }, forgotPassHandler)
	app.patch('/:id/setNewPassword/', { schema: setNewPassSchema }, setNewPassHandler)
	app.delete('/:id/', { schema: deleteUserSchema }, deleteUserHandler)
};





