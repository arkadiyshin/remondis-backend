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

const replyHistorySchema = {
    type: "object",
    properties: {
        cases: {
            type: "array",
            case: { $ref: "caseHistory#" },
        },
    },
    additionalProperties: false,
} as const;

export type ReplyHistoryList = FromSchema<
    typeof replyHistorySchema,
    { references: [typeof caseHistorySchema] }
>;

export const getCaseItemsSchema: FastifySchema = {
    summary: "Get history of case",
    description:
        "Get list of history",
    tags: ["case"],
    response: {
        200: {
            ...caseHistorySchema,
        },
    },
};