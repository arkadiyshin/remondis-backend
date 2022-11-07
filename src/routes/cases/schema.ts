import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

// case
//CaseCoreSchema rename newCaseSchema
export const newCaseSchema = {
    $id: "newCase",
    type: "object",
    properties: {
        client_phone: { type: "string" },
        client_email: { type: "string", format: "email" },
        address: { type: "string" }
    },
    required: ['client_email, address']
} as const

//CaseExtendSchema
export const caseExtendSchema = {
    $id: "caseExtend",
    type: "object",
    properties: {
        client_first_name: { type: "string" },
        client_last_name: { type: "string" },
        type_of_property: { type: "string" },
        floor: { type: "integer" },
        elevator: { type: "integer" },
        squaremeters: { type: "integer" },
        quantity: { type: "integer" },
        way_to_property: { type: "string" }
    }
} as const

//CaseFullSchema rename CaseSchema
export const caseSchema = {
    $id: "case",
    type: "object",
    properties: {
        ...{ ...newCaseSchema.properties }, ...{ ...caseExtendSchema.properties },
        create_time: { type: "string", format: "date-time" },
        assigned_time: { type: "string", format: "date-time" },
        confirmed_time: { type: "string", format: "date-time" },
        state_id: { type: "integer" },
        state: { type: "string" },
        inspector_id: { type: "integer" },
        inspector: { type: "string" },
        manager_id: { type: "integer" },
        manager: { type: "string" },
    }
} as const

/*
// case item
export const CaseItemCoreSchema = {
    $id: "CaseItemCore",
    type: "object",
    properties: {
        room: { type: "integer" },
        description: { type: "string" }
    },
} as const

export const CaseItemFullSchema = {
    $id: "CaseItemFull",
    type: "object",
    properties: {
        ...{ ...CaseItemCoreSchema.properties },
        room_title: { type: "string" },
        photo_link: { type: "string" },
        quantity: { type: "integer" }
    }
} as const
*/

// types
export const caseNotFoundSchema = {
    $id: 'CaseNotFound',
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
    required: ['id'],
    properties: {
        id: { type: 'number' }
    },
    additionalProperties: false
} as const

const querystringSchema = {
    type: 'object',
    properties: {
        date_from: { type: ["string"], format: "date-time" },
        date_to: { type: ["string"], format: "date-time" },
        state: { type: ["string"] },
        inspector_id: { type: "integer" },
        manager_id: { type: "integer" },
        role: { type: "string" },
    },
    additionalProperties: false
} as const

const replySchema = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        case: { $ref: 'case#' }
    },
    additionalProperties: false
} as const

const replyListSchema = {
    type: 'object',
    properties: {
        cases: {
            type: 'array',
            cases: { $ref: 'case#' }
        }
    },
    additionalProperties: false
} as const

export type CaseNotFound = FromSchema<typeof caseNotFoundSchema>
export type Params = FromSchema<typeof paramsSchema>
export type Querystring = FromSchema<typeof querystringSchema>
export type BodyNew = FromSchema<typeof newCaseSchema>
export type BodyChange = FromSchema<typeof caseExtendSchema>
export type Reply = FromSchema<
    typeof replySchema,
    { references: [typeof caseSchema] }
>
export type ReplyList = FromSchema<
    typeof replyListSchema,
    { references: [typeof caseSchema] }
>

// code: 200,
// success: true,
// message: "Case is changed",
// oneCase,

// Options 
export const getCasesSchema: FastifySchema = {

    summary: "Get list of cases",
    description: "Get list of cases filtered by: data ceration, state, inspector, manager",
    tags: ['case'],
    querystring: {
        date_from: { type: ["string", "null"], format: "date-time" },
        date_to: { type: ["string", "null"], format: "date-time" },
        state_id: { type: ["integer", "null"] },
        state: { type: ["string", "null"] },
        inspector_id: { type: "integer" },
        inspector: { type: "string" },
        manager_id: { type: "integer" },
        manager: { type: "string" },
    },
    response: {
        200: {
            ...replyListSchema,
        }
    },

}

export const getCaseSchema: FastifySchema = {
    summary: "Get single case by id",
    description: "Get single case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        200: {
            caseSchema
        },
        404: {
            caseNotFoundSchema
        }
    },
}

export const postCaseSchema: FastifySchema = {
    summary: "Create a new case",
    description: "Create a new case with necessary information",
    tags: ['case'],
    body: newCaseSchema,
    response: {
        201: caseSchema,
    },
}

export const updateCaseSchema: FastifySchema = {
    summary: "Update the case by id",
    description: "Update the case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: newCaseSchema,
    response: {
        201: caseSchema,
    },
}

export const changeCaseSchema: FastifySchema = {
    summary: "Add info to case by id",
    description: "Add info to case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: caseExtendSchema,
    response: {
        201: caseSchema,
    },
}

export const deleteCaseSchema: FastifySchema = {
    summary: "Delete case by id",
    description: "Delete case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: {
            message: { type: "string" },
            success: {type: "boolean"},
        }
    },
}

export const assignCaseSchema: FastifySchema = {
    summary: "Manager assigns case to inspector",
    description: "Manager assigns case to inspector",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: { inspector_id: { type: "integer" } },
    response: {
        201: caseSchema,
    },
}

export const declineCaseSchema: FastifySchema = {
    summary: "Inspector declines assignement",
    description: "Inspector declines assignement",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: { reason: { type: "string" } },
    response: {
        201: caseSchema,
    },
}

export const acceptCaseSchema: FastifySchema = {
    summary: "Inspector accepts assignement",
    description: "Inspector accepts assignement",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: caseSchema,
    },
}

export const submitCaseSchema: FastifySchema = {

    summary: "Inspector fills in all information",
    description: "Inspector fills in all information",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: caseSchema,
    },
}

export const quoteCaseOpts: FastifySchema = {
    summary: "Manager sends quote to household owner",
    description: "Manager sends quote to household owner",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    response: {
        201: caseSchema,
    },
}

export const closeCaseOpts: FastifySchema = {
    summary: "Manager closes case",
    description: "Manager closes case",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: { reason: { type: "string" } },
    response: {
        201: caseSchema,
    },
}
