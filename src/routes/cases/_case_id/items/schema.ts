import type { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";

/* model CasePhoto {
    id        Int @id @default (autoincrement())
    case_id   Int
    room      Int @default (0)
    photo     Bytes
    file_name  String @db.VarChar(255)
} */

export const casePhotoSchema = {
    $id: "casePhoto",
    type: "object",
    required: ['id', 'case_id', 'room', 'photo', 'file_name'],
    properties: {
        id: { type: ["integer"] },
        case_id: { type: ["integer"] },
        room: { type: ["integer"] },
        photo: { type: ["string"], format: "byte" },
        file_name: { type: ["string"] },
    },
} as const

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
        ...{ ...caseItemNewSchema.properties },
        /* photos: { 
            type: "array",
            CasePhoto: { 
                $ref: "casePhoto#"  
            }
        } */
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

/**
 * Photo
 */


export const casePhotoNotFoundSchema = {
    $id: "casePhotoNotFound",
    type: "object",
    required: ["success", "message"],
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
    },
    additionalProperties: false,
} as const;

const paramsPhotoSchema = {
    type: "object",
    required: ["case_id", "room", "photo_id"],
    properties: {
        case_id: { type: "string" },
        room: { type: "string" },
        photo_id: { type: "string" },
    },
    additionalProperties: false,
} as const;

const paramsReqPhotoSchema = {
    type: "object",
    required: ["case_id", "room"],
    properties: {
        case_id: { type: "string" },
        room: { type: "string" },
    },
    additionalProperties: false,
} as const;

const replyPhotoSchema = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        casePhoto: { $ref: "casePhoto#" },
    },
    additionalProperties: false,
} as const;

const replyListPhotoSchema = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        casePhotos: {
            type: "array",
            casePhoto: { $ref: "casePhoto#" },
        },
    },
    additionalProperties: false,
} as const;

export type CasePhotoNotFound = FromSchema<typeof casePhotoNotFoundSchema>;
export type ParamsPhoto = FromSchema<typeof paramsPhotoSchema>;
export type ParamsReqPhoto = FromSchema<typeof paramsReqPhotoSchema>;
export type BodyPhoto = FromSchema<typeof casePhotoSchema
/* , {
    deserialize: [
        {
            pattern: {
                type: "string";
                format: "byte";
            };
            output: Buffer;
        }
    ];
} */
>;
export type ReplyPhoto = FromSchema<
    typeof replyPhotoSchema,
    { references: [typeof casePhotoSchema] }
>;
export type ReplyListPhoto = FromSchema<
    typeof replyListPhotoSchema,
    { references: [typeof casePhotoSchema] }
>;


export const postCasePhotoSchema: FastifySchema = {
    summary: "Add a new photo to the case",
    description: "Add a new photo to the case",
    tags: ["case"],
    body: casePhotoSchema,
    response: {
        201: {
            ...replyPhotoSchema,
        },
    },
};

export const updateCasePhotoSchema: FastifySchema = {
    summary: "Update the photo in the case by case id and room",
    description: "Update the photo in the case by case id and room",
    tags: ["case"],
    params: {
        ...paramsPhotoSchema,
    },
    body: casePhotoSchema,
    response: {
        200: {
            ...replyPhotoSchema,
        },
        404: {
            ...caseItemNotFoundSchema,
        },
    },
};

export const deleteCasePhotoSchema: FastifySchema = {
    summary: "Delete the photo in the case by case id and room",
    description: "Delete the photo in the case by case id and room",
    tags: ["case"],
    params: {
        ...paramsPhotoSchema,
    },
    response: {
        201: {
            message: { type: "string" },
            success: { type: "boolean" },
        },
    },
};