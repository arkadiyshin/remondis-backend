import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'


export const appointmentNewSchema = {
    $id: "appointmentNew",
    type: "object",
    properties: {
        date: { type: "string", format: "date" },
        time_from: { type: "string", format: "time" },
        time_to: { type: "string", format: "time" }
    },
} as const;

export const appointmentExtendedSchema = {
    $id: "appointmentExtended",
    type: "object",
    properties: {
        ...{ ...appointmentNewSchema.properties },
        case_id: { type: "integer" },
    },
} as const;

export const appointmentSchema = {
    $id: "appointment",
    type: "object",
    properties: {
        ...{ ...appointmentExtendedSchema.properties },
    },
} as const;

// types
export const appointmentNotFoundSchema = {
    $id: 'userNotFound',
    type: 'object',
    required: ['success', 'message'],
    properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
    },
    additionalProperties: false
} as const

const paramsSchema = {
    type: 'object',
    required: ['appointment_id'],
    properties: {
        case_id: { type: 'integer' },
    },
    additionalProperties: false
} as const

const querystringSchema = {
    type: 'object',
    properties: {
        case_id: { type: "integer" },
        date_from: { type: "string", format: "date" },
        date_to: { type: "string", format: "date" },
    },
    additionalProperties: false
} as const

const replySchema = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        appointment: { $ref: 'appointment#' }
    },
    additionalProperties: false
} as const

const replyListSchema = {
    type: 'object',
    properties: {
        users: {
            type: 'array',
            appointments: { $ref: 'appointment#' }
        }
    },
    additionalProperties: false
} as const

export type AppointmentNotFound = FromSchema<typeof appointmentNotFoundSchema>
export type Params = FromSchema<typeof paramsSchema>
export type Querystring = FromSchema<typeof querystringSchema>
export type BodyNew = FromSchema<typeof appointmentNewSchema>
export type BodyChange = FromSchema<typeof appointmentExtendedSchema>
export type Reply = FromSchema<
    typeof replySchema,
    { references: [typeof appointmentSchema] }
>
export type ReplyList = FromSchema<
    typeof replyListSchema,
    { references: [typeof appointmentSchema] }
>


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
            ...replyListSchema,
        },
    }
}

export const getAppointmentByCaseSchema: FastifySchema = {
    summary: "Get single appointment",
    description: "Get single appointment",
    tags: ['appointment'],
    params: {
        ...paramsSchema,
    },
    response: {
        200: {
            ...replySchema,
        },
        404: {
            ...appointmentNotFoundSchema,
        }
    }
}

export const postAppointmentByCaseSchema: FastifySchema = {
    summary: "Create a new appointment",
    description: "Create a new appointment",
    tags: ['appointment'],
    params: {
        ...paramsSchema
    },
    body: appointmentNewSchema,
    response: {
        200: {
            ...replySchema,
        },
    }
}

export const putAppointmentByCaseSchema: FastifySchema = {
    summary: "Change an appointment",
    description: "Change an appointment",
    tags: ['appointment'],
    params: {
        ...paramsSchema
    },
    body: appointmentExtendedSchema,
    response: {
        200: {
            ...replySchema,
        },
        404: {
            ...appointmentNotFoundSchema,
        }
    },
}

export const deleteAppointmentByCaseSchema: FastifySchema = {
    summary: "Delete an appointment",
    description: "Delete an appointment",
    tags: ['appointment'],
    params: {
        ...paramsSchema
    },
    response: {
        201: {
            properties: {
                message: { type: 'string' }
            }
        },
    },
}