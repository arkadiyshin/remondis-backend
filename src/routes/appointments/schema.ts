import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'


export const CoreAppointmentSchema = {
    $id: "CoreAppointment",
    type: "object",
    properties: {
        date: { type: "string", format: "date" },
        time_from: { type: "string", format: "time" },
        time_to: { type: "string", format: "time" }
    },
} as const;

export const NewAppointmentSchema = {
    $id: "NewAppointment",
    type: "object",
    properties: {
        ...{ ...CoreAppointmentSchema.properties },
        case_id: { type: "integer" },
    },
} as const;

export const FullAppointmentSchema = {
    $id: "FullAppointment",
    type: "object",
    properties: {
        ...{ ...NewAppointmentSchema.properties },
    },
} as const;


// Options

export const getAppointmentsSchema: FastifySchema = {
    summary: "Get list of appointments",
    description: "Get list of appointments",
    tags: ['appointment'],
    querystring: {
        case_id: { type: "integer" },
        date_from: { type: "string", format: "date" },
        date_to: { type: "string", format: "date" },
    },
    response: {
        200: {
            type: "array",
            items: FullAppointmentSchema,
        },
    }
}

export const getAppointmentByCaseSchema: FastifySchema = {
    summary: "Get single appointment",
    description: "Get single appointment",
    tags: ['appointment'],
    params: {
        case_id: { type: 'integer' },
    },
    
    response: {
        201: FullAppointmentSchema
    }
}

export const postAppointmentByCaseSchema: FastifySchema = {
    summary: "Create a new appointment",
    description: "Create a new appointment",
    tags: ['appointment'],
    params: {
        case_id: { type: 'integer' },
    },
    body: CoreAppointmentSchema,
    response: {
        201: FullAppointmentSchema,
    }
}

export const putAppointmentByCaseSchema: FastifySchema = {
    summary: "Change an appointment",
    description: "Change an appointment",
    tags: ['appointment'],
    params: {
        case_id: { type: 'integer' },
    },
    body: CoreAppointmentSchema,
    response: {
        201: FullAppointmentSchema,
    },
}

export const deleteAppointmentByCaseSchema: FastifySchema = {
    summary: "Delete an appointment",
    description: "Delete an appointment",
    tags: ['appointment'],
    params: {
        case_id: { type: 'integer' },
    },
    response: {
        201: {
            properties: {
                message: { type: 'string' }
            }
        },
    },
}