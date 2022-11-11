import type { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";


export const caseItemNewSchema = {
    $id: "caseItemNew",
    type: "object",
    properties: {
        room_title: { type: ["string", "null"] },
        description: { type: ["string", "null"] },
        quantity: { type: ["integer"] },
    },
} as const;

export const caseItemSchema = {
    $id: "caseItem",
    type: "object",
    required: ['case_id', 'room'],
    properties: {
        case_id: { type: "number" },
        room: { type: "number" },
        ...{...caseItemNewSchema.properties},
    },
} as const;


// types
export const caseItemNotFoundSchema = {
    $id: "caseItemNotFound",
    type: "object",
    required: ["success", "message"],
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
    },
    additionalProperties: false,
} as const;

const paramsSchema = {
    type: "object",
    required: ["case_id"],
    properties: {
        case_id: { type: "string" },
        room: { type: "string" },
    },
    additionalProperties: false,
} as const;

const paramsReqSchema = {
    type: "object",
    required: ["case_id"],
    properties: {
        case_id: { type: "string" },
    },
    additionalProperties: false,
} as const;

const querystringSchema = {
    type: "object",
    properties: {
    },
    additionalProperties: false,
} as const;

const replySchema = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        caseItem: { $ref: "caseItem#" },
    },
    additionalProperties: false,
} as const;

const replyListSchema = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        caseItems: {
            type: "array",
            caseItem: { $ref: "caseItem#" },
        },
    },
    additionalProperties: false,
} as const;

export type CaseItemNotFound = FromSchema<typeof caseItemNotFoundSchema>;
export type Params = FromSchema<typeof paramsSchema>;
export type ParamsReq = FromSchema<typeof paramsReqSchema>;
export type Querystring = FromSchema<typeof querystringSchema>;
export type BodyNew = FromSchema<typeof caseItemNewSchema>;
export type Body = FromSchema<typeof caseItemSchema>;
export type Reply = FromSchema<
    typeof replySchema,
    { references: [typeof caseItemSchema] }
>;
export type ReplyList = FromSchema<
    typeof replyListSchema,
    { references: [typeof caseItemSchema] }
>;

// options

export const getCaseItemsSchema: FastifySchema = {
    summary: "Get items of case",
    description:
        "Get items of case",
    tags: ["case"],
    params: paramsReqSchema,
    response: {
        200: {
            ...replyListSchema,
        },
    },
};

export const getCaseItemSchema: FastifySchema = {
    summary: "Get single item by case id and room",
    description: "Get single item by case id and room",
    tags: ["case"],
    params: {
        ...paramsSchema,
    },
    response: {
        200: {
            ...replySchema,
        },
        404: {
            ...caseItemNotFoundSchema,
        },
    },
};

export const postCaseItemSchema: FastifySchema = {
    summary: "Add a new item to the case",
    description: "Add a new item to the case",
    tags: ["case"],
    body: caseItemNewSchema,
    response: {
        201: {
            ...replySchema,
        },
    },
};

export const updateCaseItemSchema: FastifySchema = {
    summary: "Update the item in the case by case id and room",
    description: "Update the item in the case by case id and room",
    tags: ["case"],
    params: {
        ...paramsSchema,
    },
    body: caseItemSchema,
    response: {
        200: {
            ...replySchema,
        },
        404: {
            ...caseItemNotFoundSchema,
        },
    },
};

export const deleteCaseItemSchema: FastifySchema = {
    summary: "Delete the item in the case by case id and room",
    description: "Delete the item in the case by case id and room",
    tags: ["case"],
    params: {
        ...paramsSchema,
    },
    response: {
        201: {
            message: { type: "string" },
            success: { type: "boolean" },
        },
    },
};