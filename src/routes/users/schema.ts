import type { FastifySchema } from "fastify";
import { FromSchema } from 'json-schema-to-ts'


export const userNewSchema = {
    $id: "userNew",
    type: "object",
    properties: {
        email_address: { type: "string", format: "email" },
    },
} as const;

export const userExtendedSchema = {
    $id: "userExtended",
    type: "object",
    properties: {
        id: { type: "integer" },
        username: { type: ["string","null"] },        
        password: { type: "string", format: "password" },
        ...{ ...userNewSchema.properties },
        role: { type: ["string", "null"] },
    },
} as const;

export const userSchema = {
    $id: "user",
    type: "object",
    properties: {
        ...{ ...userExtendedSchema.properties },
        state: { type: ["string", "null"] },
        created_time: { type: "string" },
        confirmed_time: { type: "string" },
    },
} as const;

export const userLoginSchema = {
    $id: "userLogin",
    type: "object",
    properties: {
        username: { type: ["string","null"] },        
        password: { type: "string", format: "password" },
    },
} as const;

// types
export const userNotFoundSchema = {
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
    required: ['user_id'],
    properties: {
        user_id: { type: 'string' }
    },
    additionalProperties: false
} as const

const querystringSchema = {
    type: 'object',
    properties: {
        role: { type: ["string", "null"] },
    },
    additionalProperties: false
} as const

const replySchema = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        user: { $ref: 'user#' }
    },
    additionalProperties: false
} as const

const replyListSchema = {
    type: 'object',
    properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        users: {
            type: 'array',
            users: { $ref: 'user#' }
        }
    },
    additionalProperties: false
} as const


export type UserNotFound = FromSchema<typeof userNotFoundSchema>
export type Params = FromSchema<typeof paramsSchema>
export type Querystring = FromSchema<typeof querystringSchema>
export type BodyNew = FromSchema<typeof userNewSchema>
export type BodyChange = FromSchema<typeof userExtendedSchema>
export type BodyLogin = FromSchema<typeof userLoginSchema>
export type Reply = FromSchema<
    typeof replySchema,
    { references: [typeof userSchema] }
>
export type ReplyList = FromSchema<
    typeof replyListSchema,
    { references: [typeof userSchema] }
>


// Get all users options
export const getUsersSchema: FastifySchema = {
    summary: "user list",
    description: "get list of all users: role-filter",
    tags: ["user"],
    querystring: {
        ...querystringSchema,
    },
    response: {
        200: {
            ...replyListSchema
        },
    },
};

// Get single user options
export const getUserSchema: FastifySchema = {
    summary: "single user list",
    description: "get list of a single users: role-filter, id-filter",
    tags: ["user"],
    params: {
        ...paramsSchema,
    },
    querystring: {
        querystringSchema,
    },
    response: {
        200: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};

// Create new user options
export const createUserSchema: FastifySchema = {
    summary: "Create a new user",
    description: "Create a new case with only email address before confirmation",
    tags: ["user"],
    body: {
        ...userNewSchema
    },
    response: {
        201: {
            ...replySchema
        },
    },
};

// continue Create new user options after email confirmation
export const confirmUserSchema: FastifySchema = {
    summary: "Confirm user",
    description:
        "After email token comfirmation all new user will continue to fill out the rest of the registration form",
    tags: ["user"],
    headers: {
        authorization: {type: "string"}
    },
    // params: {
    //     ...paramsSchema,
    // },
    // body: {
    //     ...userExtendedSchema,
    // },
    response: {
        201: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};

// update user options
export const updateUserSchema: FastifySchema = {
    summary: "Update user information",
    description: "update all user information",
    tags: ["user"],
    params: {
        ...paramsSchema
    },
    body: {
        ...userSchema
    },
    response: {
        201: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};

// update user role options
export const changeUserRoleSchema: FastifySchema = {
    summary: "Change user role information",
    description: "update user role",
    tags: ["user"],
    params: {
        id: { type: "integer" },
    },
    body: userSchema.properties.role,
    response: {
        201: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};

// set new user password options
export const setNewPassSchema: FastifySchema = {
    summary: "set a new password if you forgot your previous password",
    description: "update user password",
    tags: ["user"],
    params: {
        ...paramsSchema
    },
    body: { password: { type: "string" } },
    response: {
        201: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};

// set new user password options
export const forgotPassSchema: FastifySchema = {
    summary: "use user email address to request to set a new password",
    description: "user forgot password",
    tags: ["user"],
    params: {
        ...paramsSchema
    },
    body: {
        ...userNewSchema
    },
    response: {
        201: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};

// delete user options
export const deleteUserSchema: FastifySchema = {
    summary: "for dev team only",
    description: "delete user",
    tags: ["user"],
    params: {
        ...paramsSchema
    },
    response: {
        204: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};
//login user

export const loginUserSchema: FastifySchema = {
    summary: "login user",
    description: "login user",
    tags: ["user"],
    body: {
        ...userLoginSchema.properties
    },
    response:{
        200: {
            ...replySchema
        },
        404: {
            ...userNotFoundSchema
        }
    },
};