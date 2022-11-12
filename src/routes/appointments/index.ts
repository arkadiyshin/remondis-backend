import type { FastifyInstance } from 'fastify'
import {
    appointmentSchema,
    getAppointmentsSchema,
    getAppointmentByCaseSchema,
    postAppointmentByCaseSchema,
    putAppointmentByCaseSchema,
    deleteAppointmentByCaseSchema
} from './schema'

import {
    getAppointmentsHandler,
    getAppointmentByHandler,
    postAppointmentByCaseHandler,
    putAppointmentByCaseHandler,
    deleteAppointmentByCaseHandler,
} from './handler'

export default async (app: FastifyInstance) => {
    
    app.addSchema(appointmentSchema);

    app.get('/', { schema: getAppointmentsSchema }, getAppointmentsHandler)
    app.get('/:case_id', { schema: getAppointmentByCaseSchema }, getAppointmentByHandler)
    app.post('/:case_id', { schema: postAppointmentByCaseSchema }, postAppointmentByCaseHandler)
    app.put('/:case_id', { schema: putAppointmentByCaseSchema }, putAppointmentByCaseHandler)
    app.delete('/:case_id', { schema: deleteAppointmentByCaseSchema }, deleteAppointmentByCaseHandler)

}