import type { FastifyInstance } from 'fastify'
import {
    appointmentNewSchema,
    appointmentExtendedSchema,
    appointmentSchema,
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
    
    app.addSchema(appointmentNewSchema);
    app.addSchema(appointmentExtendedSchema);
    app.addSchema(appointmentSchema);

    app.get('/', { schema: getAppointmentsSchema }, getAppointmentsHandler)
    app.get('/:case_id', { schema: getAppointmentByCaseSchema }, getAppointmentByHandler)
    app.post('/:case_id', { schema: postAppointmentByCaseSchema }, postAppointmentByCaseHandler)
    app.put('/:case_id', { schema: putAppointmentByCaseSchema }, putAppointmentByCaseHandler)
    app.delete('/:case_id', { schema: deleteAppointmentByCaseSchema }, deleteAppointmentByCaseHandler)

}