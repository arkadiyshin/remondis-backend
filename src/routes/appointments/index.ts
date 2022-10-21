import type { FastifyInstance } from 'fastify'
import {
    CoreAppointmentSchema,
    NewAppointmentSchema,
    FullAppointmentSchema,
    getAppointmentsSchema,
    getAppointmentByCaseSchema,
    postAppointmentByCaseSchema,
    putAppointmentByCaseSchema,
    deleteAppointmentByCaseSchema
} from './schema.js'

import {
    getAppointmentsHandler,
    getAppointmentByHandler,
    postAppointmentByCaseHandler,
    putAppointmentByCaseHandler,
    deleteAppointmentByCaseHandler,
} from './handler.js'

export default async (app: FastifyInstance) => {
    
    app.addSchema(CoreAppointmentSchema);
    app.addSchema(NewAppointmentSchema);
    app.addSchema(FullAppointmentSchema);

    app.get('/', { schema: getAppointmentsSchema }, getAppointmentsHandler)
    app.get('/:case_id', { schema: getAppointmentByCaseSchema }, getAppointmentByHandler)
    app.post('/', { schema: postAppointmentByCaseSchema }, postAppointmentByCaseHandler)
    app.put('/:case_id/:id', { schema: putAppointmentByCaseSchema }, putAppointmentByCaseHandler)
    app.delete('/:case_id', { schema: deleteAppointmentByCaseSchema }, deleteAppointmentByCaseHandler)

}