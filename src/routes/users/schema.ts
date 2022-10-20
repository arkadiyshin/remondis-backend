import type { FastifySchema } from "fastify";

export const newUserSchema = {
  $id: "newUser",
  type: "object",
  properties: {
    email_address: { type: "string", format: "email" },
  },
} as const;

export const newUserExtendedSchema = {
  $id: "extedNewUser",
  type: "object",
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    password: { type: "string", format: "password" },
    ...{ ...newUserSchema.properties },
    role: { type: "string" },
  },
} as const;

export const userFullSchema = {
  $id: "fullUser",
  type: "object",
  properties: {
    ...{ ...newUserExtendedSchema.properties },
    state: { type: "string" },
    created_time: { type: "string" },
    confirmed_time: { type: "string" },
  },
} as const;



// Get all users options
export const getUsersSchema: FastifySchema = {
  summary: "user list",
  description: "get list of all users: role-filter",
  tags: ["user"],
  params: {
    role: { type: "string" },
  },
  response: {
    200: {
      type: "array",
      items: userFullSchema,
    },
  },
};

// Get single user options
export const getUserSchema: FastifySchema = {
  summary: "single user list",
  description: "get list of a single users: role-filter, id-filter",
  tags: ["user"],
  params: {
    id: { type: "string" },
  },
  querystring: {
    role: { type: "string" },
  },
  response: {
    200: {
      type: "array",
      items: userFullSchema,
    },
  },
};

// Create new user options
export const createNewUserSchema: FastifySchema = {
  summary: "Create a new user",
  description: "Create a new case with only email address before confirmation",
  tags: ["user"],
  body: newUserSchema.properties.email_address,
  response: {
    201: {
      type: "array",
      items: newUserSchema,
    },
  },
};

// continue Create new user options after email confirmation
export const confirmNewUserSchema: FastifySchema = {
  summary: "Confirm user",
  description:
    "After email token comfirmation all new user will continue to fill out the rest of the registration form",
  tags: ["user"],
  params: {
    id: { type: "integer"},
  },
  body: newUserExtendedSchema.properties,
  response: {
    201: {
      type: "array",
      items: userFullSchema,
    },
  },
};

// update user options
export const updateUserSchema: FastifySchema = {
  summary: "Update user information",
  description: "update all user information",
  tags: ["user"],
  params: {
    id: { type: "integer" },
  },
  body: userFullSchema,
  response: {
    201: {
      type: "array",
      items: userFullSchema,
    },
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
  body: userFullSchema.properties.role,
  response: {
    201: {
      type: "array",
      items: userFullSchema,
    },
  },
};

// set new user password options
export const setNewPassSchema: FastifySchema = {
  summary: "set a new password if you forgot your previous password",
  description: "update user password",
  tags: ["user"],
  params: {
    id: { type: "integer" },
  },
  body: { new_Password: { type: "string" } },
  response: {
    201: {
      type: "array",
      items: userFullSchema,
    },
  },
};

// set new user password options
export const forgotPassSchema: FastifySchema = {
  summary: "use user email address to request to set a new password",
  description: "user forgot password",
  tags: ["user"],
  params: {
    id: { type: "integer" },
  },
  body: newUserSchema.properties.email_address,
  response: {
    201: {
      type: "array",
      items: setNewPassSchema,
    },
  },
};


// delete user options
export const deleteUserSchema: FastifySchema = {
    summary: "for dev team only",
    description: "delete user",
    tags: ["user"],
    params: {
      id: { type: "integer" },
    },
    response: {
      201: {
        type: "array",
        items: userFullSchema,
      },
    },
  };
