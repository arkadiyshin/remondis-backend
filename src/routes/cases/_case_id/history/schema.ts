import type { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";

// history
export const caseHistorySchema = {
    $id: "caseHistory",
    type: "object",
    properties: {
        id: { type: "number" },
        case_id: { type: "number" },
        time: { type: "string", format: "date-time" },
        case_state_id: { type: ["integer", "null"] },
        case_new_state_id: { type: ["integer", "null"] },
        user_id: { type: ["integer", "null"] },
        description: { type: ["string", "null"] },
        case_data: { type: "object" },
    },
} as const;

const paramsSchema = {
    type: "object",
    required: ["case_id"],
    properties: {
        case_id: { type: "string" },
    },
    additionalProperties: false,
} as const;

const replySchema = {
    type: "object",
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        casesHistory: {
            type: "array",
            caseHistory: { $ref: "caseHistory#" },
        },
    },
    additionalProperties: false,
} as const;

export type Params = FromSchema<typeof paramsSchema>;
export type ReplyList = FromSchema<
    typeof replySchema,
    { references: [typeof caseHistorySchema] }
>;

export const getCaseHistorySchema: FastifySchema = {
    summary: "Get history of case",
    description:
        "Get list of history",
    tags: ["case"],
    params: paramsSchema,
    response: {
        200: {
            ...caseHistorySchema,
        },
    },
};