import type { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

export const CaseCoreSchema = {
    $id: 'caseCore',
    type: "object",
    properties: {
        client_phone: { type: "string" },
        client_email: { type: "string", format: "email" },
        address: { type: "string" }
    }
} as const

export const CaseExtendSchema = {
    $id: 'caseExtend',
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

export const CaseFullSchema = {
    $id: 'caseFull',
    type: "object",
    properties: {
        ...{ ...CaseCoreSchema.properties }, ...{ ...CaseExtendSchema.properties },
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

export const CaseItemCoreSchema = {
    $id: 'caseItemCore',
    type: "object",
    properties: {
        room: { type: "integr" },
        description: { type: "string" }
    },
    required: ['title', 'published', 'content', 'tags', 'deleted']
} as const

export const CaseItemFullSchema = {
    $id: 'caseItemFull',
    type: "object",
    properties: {
        ...{ ...CaseItemCoreSchema.properties },
        room_title: { type: "string" },
        photo_link: { type: "string" },
        quantity: { type: "integer" }
    }
} as const



// Options to get all items
export const getCasesSchema: FastifySchema = {

    summary: "Get list of cases",
    description: "Get list of cases filtered by: data ceration, state, inspector, manager",
    tags: ['case'],
    params: {
        date_from: { type: "string", format: "date-time" },
        date_to: { type: "string", format: "date-time" },
        state_id: { type: "integer" },
        state: { type: "string" },
        inspector_id: { type: "integer" },
        inspector: { type: "string" },
        manager_id: { type: "integer" },
        manager: { type: "string" },
    },
    response: {
        200: {
            type: "array",
            items: CaseFullSchema,
        },
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
            CaseFullSchema
        },
    },
}

export const postCaseSchema: FastifySchema = {
    summary: "Create a new case",
    description: "Create a new case with necessary information",
    tags: ['case'],
    body: CaseCoreSchema,
    response: {
        201: CaseCoreSchema,
    },
}

export const updateCaseSchema: FastifySchema = {
    summary: "Update the case by id",
    description: "Update the case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: CaseCoreSchema,
    response: {
        201: CaseCoreSchema,
    },
}

export const changeCaseSchema: FastifySchema = {
    summary: "Add info to case by id",
    description: "Add info to case by id",
    tags: ['case'],
    params: {
        id: { type: "integer" },
    },
    body: CaseExtendSchema,
    response: {
        201: CaseFullSchema,
    },
}

export const deleteCaseSchema : FastifySchema = {
        summary: "Delete case by id",
        description: "Delete case by id",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            201: CaseCoreSchema,
        },
    }
/*
const assignCaseOpts = {
    schema: {
        summary: "Manager assigns case to inspector",
        description: "Manager assigns case to inspector",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        body: { inspector_id: { type: "integer" } },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const reAssignCaseOpts = {
    schema: {
        summary: "Manager re-assigns case to inspector",
        description: "Manager re-assigns case to inspector",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        body: { inspector_id: { type: "integer" } },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const declineCaseOpts = {
    schema: {
        summary: "Inspector declines assignement",
        description: "Inspector declines assignement",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const acceptCaseOpts = {
    schema: {
        summary: "Inspector accepts assignement",
        description: "Inspector accepts assignement",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const invalidateCaseOpts = {
    schema: {
        summary: "Manager invalidates some information",
        description: "Manager invalidates some information",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const fillAllCaseOpts = {
    schema: {
        summary: "Inspector fills in all information",
        description: "Inspector fills in all information",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const quoteCaseOpts = {
    schema: {
        summary: "Manager sends quote to household owner",
        description: "Manager sends quote to household owner",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}

const closeCaseOpts = {
    schema: {
        summary: "Manager closes case",
        description: "Manager closes case",
        tags: ['case'],
        params: {
            id: { type: "integer" },
        },
        response: {
            200: {
                description: 'successful operation',
                type: 'string'
            },
        },
    },

    handler: () => { },
}


*/