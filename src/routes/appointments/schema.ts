import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'


export const appointmentSchema = {
    $id: "appointment",
    type: "object",
    properties: {
        date: { type: "string", format: `date-time`},
        time_from: { type: "string", format: `date-time`},
        time_to: { type: "string", format: `date-time`}
    },
} as const;

// types
export const appointmentNotFoundSchema = {
    $id: 'appointmentNotFound',
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
    required: ['case_id'],
    properties: {
        case_id: { type: 'string' },
    },
    additionalProperties: false
} as const

const querystringSchema = {
    type: 'object',
    properties: {
        case_id: { type: "string" },
        date_from: { type: "string"},
        date_to: { type: "string"},
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
        appointments: {
            type: 'array',
            appointments: { $ref: 'appointment#' }
        }
    },
    additionalProperties: false
} as const

export type AppointmentNotFound = FromSchema<typeof appointmentNotFoundSchema>
export type Params = FromSchema<typeof paramsSchema>
export type Querystring = FromSchema<typeof querystringSchema>
export type Body = FromSchema<typeof appointmentSchema>;
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
        ...querystringSchema
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
    body: appointmentSchema,
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
    body: appointmentSchema,
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