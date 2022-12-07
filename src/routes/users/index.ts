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
	//setNewPassSchema,
	//deleteUserSchema,
	loginUserSchema,
} from "./schema";
import {
	getUserHandler,
	getUsersHandler,
	createUserHandler,
	confirmedUserHandler,
	updateUserHandler,
	forgotPassHandler,
	// setNewPassHandler,
	// deleteUserHandler,
	loginUserHandler,
} from "./handler";


export default async (app: FastifyInstance) => {

	app.addSchema(userNewSchema);
	app.addSchema(userExtendedSchema);
	app.addSchema(userSchema);

	app.get('/', { schema: getUsersSchema }, getUsersHandler)
	app.get('/:user_id', { schema: getUserSchema }, getUserHandler)
	app.post('/login', {schema: loginUserSchema}, loginUserHandler)
	app.post('/register', { schema: createUserSchema }, createUserHandler)
	app.put('/confirm', { schema: confirmUserSchema }, confirmedUserHandler)
	app.put('/:user_id', { schema: updateUserSchema }, updateUserHandler)
	app.patch('/forgotPassword', { schema: forgotPassSchema }, forgotPassHandler)
	// app.patch('/:user_id/setNewPassword', { schema: setNewPassSchema }, setNewPassHandler)
	// app.delete('/:user_id/', { schema: deleteUserSchema }, deleteUserHandler)
};





