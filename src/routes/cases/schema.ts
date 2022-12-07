import type { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { appointmentSchema } from "../appointments/schema";
import { userSchema } from "../users/schema";

export const caseNewSchema = {
  $id: "caseNew",
  type: "object",
  properties: {
    client_phone: { type: "string" },
    client_email: { type: "string", format: "email" },
    address: { type: "string" },
  },
  required: ["client_email", "address"],
} as const;

export const caseExtendSchema = {
  $id: "caseExtended",
  type: "object",
  properties: {
    client_first_name: { type: ["string", "null"] },
    client_last_name: { type: ["string", "null"] },
    type_of_property_id: { type: ["integer", "null"] },
    floor: { type: "integer" },
    elevator: { type: ["boolean", "null"] },
    squaremeters: { type: "integer" },
    quantity: { type: "integer" },
    way_to_property: { type: ["string", "null"] },
    number_of_rooms: { type: ["integer", "null"] },
    clear_area: { type: ["boolean", "null"] },
    back_house: { type: ["boolean", "null"] },
    parking: { type: ["boolean", "null"] },
    furniture_lift: { type: ["boolean", "null"] },
    closet_contents: { type: ["boolean", "null"] },
    removing_carpets: { type: ["boolean", "null"] },
    removing_lamps: { type: ["boolean", "null"] },
    removing_curtain: { type: ["boolean", "null"] },
  },
} as const;

export const caseSchema = {
  $id: "case",
  type: "object",
  properties: {
    ...{ ...caseNewSchema.properties },
    ...{ ...caseExtendSchema.properties },
    id: { type: "number" },
    case_id: { type: "number" },
    created_at: { type: "string", format: "date-time" },
    assigned_at: { type: ["string", "null"], format: "date-time" },
    confirmed_at: { type: ["string", "null"], format: "date-time" },
    state_id: { type: ["integer", "null"] },
    //state: { type: "string" },
    inspector_id: { type: ["integer", "null"] },
    //inspector: { type: ["string", "null"] },
    manager_id: { type: ["integer", "null"] },
    manager: { type: ["string", "null"] },
    message: { type: ["string"] },
    action: { type: ["string"] },
    Appointment: { type: ["object", "null"], properties: appointmentSchema.properties },
    Inspector: { type: ["object", "null"], properties: userSchema.properties },

  },
} as const;

export const caseStatusSchema = {
  $id: "caseUser",
  type: "object",
  properties: {
    user_id: { type: "integer" },
    inspector_id: { type: "integer" },
    reason: { type: "string" },
  },
  required: ["user_id"],
} as const;

export const caseCoordinatesSchema = {
  $id: "caseCoordinates",
  type: "object",
  properties: {
    lng: { type: "number" },
    lat: { type: "number" },
    address: { type: "string" },
  },
  //required: ["lng" , "lat"],
} as const;

// types
export const caseNotFoundSchema = {
  $id: "caseNotFound",
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
  },
  additionalProperties: false,
} as const;

const paramsUserIdSchema = {
  type: "object",
  required: ["user_id"],
  properties: {
    user_id: { type: "string" },
  },
  additionalProperties: false,
} as const;

const querystringSchema = {
  type: "object",
  properties: {
    date_from: { type: ["string"], format: "date-time" },
    date_to: { type: ["string"], format: "date-time" },
    state_id: { type: ["integer"] },
    state: { type: ["string"] },
    inspector_id: { type: "integer" },
    inspector: { type: ["string"] },
    manager_id: { type: "integer" },
    manager: { type: ["string"] },
  },
  additionalProperties: false,
} as const;

const replySchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    case: { $ref: "case#" },
  },
  additionalProperties: false,
} as const;

const replyListSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    cases: {
      type: "array",
      cases: { $ref: "case#" },
    },
  },
  additionalProperties: false,
} as const;

const replyCoordinatesSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
    coordinates: {
      type: "array",
      coordinates: { $ref: "caseCoordinatesSchema#" },
    },
  },
  additionalProperties: false,
} as const;

export type CaseNotFound = FromSchema<typeof caseNotFoundSchema>;
export type Params = FromSchema<typeof paramsSchema>;
export type ParamsUserId = FromSchema<typeof paramsUserIdSchema>;
export type Querystring = FromSchema<typeof querystringSchema>;
export type BodyNew = FromSchema<typeof caseNewSchema>;
export type BodyChange = FromSchema<typeof caseExtendSchema>;
export type BodyStatus = FromSchema<typeof caseStatusSchema>;
export type Coordinates = FromSchema<typeof caseCoordinatesSchema>;
export type Reply = FromSchema<
  typeof replySchema,
  {
    references: [typeof caseSchema], deserialize: [
      {
        pattern: {
          type: "string";
          format: "date";
        };
        output: Date;
      },
      {
        pattern: {
          type: "string";
          format: "date-time";
        };
        output: Date;
      }
    ];
  }
>;
export type ReplyList = FromSchema<
  typeof replyListSchema,
  { references: [typeof caseSchema] }
>;
export type ReplyCoordinates = FromSchema<
  typeof replyCoordinatesSchema,
  { references: [typeof caseCoordinatesSchema] }
>

// Options
export const getCasesSchema: FastifySchema = {
  summary: "Get list of cases",
  description:
    "Get list of cases filtered by: data ceration, state, inspector, manager",
  tags: ["case"],
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
    },
  },
};

export const getCaseSchema: FastifySchema = {
  summary: "Get single case by id",
  description: "Get single case by id",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  response: {
    200: {
      ...replySchema,
    },
    404: {
      ...caseNotFoundSchema,
    },
  },
};

export const postCaseSchema: FastifySchema = {
  summary: "Create a new case",
  description: "Create a new case with necessary information",
  tags: ["case"],
  body: caseNewSchema,
  response: {
    201: {
      ...replySchema,
    },
  },
};

export const updateCaseSchema: FastifySchema = {
  summary: "Update the case by id",
  description: "Update the case by id",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseNewSchema,
  response: {
    200: {
      ...replySchema,
    },
    404: {
      ...caseNotFoundSchema,
    },
  },
};

export const changeCaseSchema: FastifySchema = {
  summary: "Add info to case by id",
  description: "Add info to case by id",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseExtendSchema,
  response: {
    200: {
      ...replySchema,
    },
    404: {
      ...caseNotFoundSchema,
    },
  },
};

/* export const deleteCaseSchema: FastifySchema = {
  summary: "Delete case by id",
  description: "Delete case by id",
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
}; */

export const assignCaseSchema: FastifySchema = {
  summary: "Manager assigns case to inspector",
  description: "Manager assigns case to inspector",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseStatusSchema,
  response: {
    200: {
      ...replySchema,
    },
    403: {
      ...caseNotFoundSchema,
    },
  },
};

export const declineCaseSchema: FastifySchema = {
  summary: "Inspector declines assignement",
  description: "Inspector declines assignement",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseStatusSchema,
  response: {
    200: {
      ...replySchema,
    },
    403: {
      ...caseNotFoundSchema,
    },
  },
};

export const acceptCaseSchema: FastifySchema = {
  summary: "Inspector accepts assignement",
  description: "Inspector accepts assignement",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseStatusSchema,
  response: {
    200: {
      ...replySchema,
    },
    403: {
      ...caseNotFoundSchema,
    },
  },
};

export const readyCaseSchema: FastifySchema = {
  summary: "Inspector fills in all information",
  description: "Inspector fills in all information",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseStatusSchema,
  response: {
    200: {
      ...replySchema,
    },
    403: {
      ...caseNotFoundSchema,
    },
  },
};

export const quoteCaseSchema: FastifySchema = {
  summary: "Manager sends quote to household owner",
  description: "Manager sends quote to household owner",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseStatusSchema,
  response: {
    200: {
      ...replySchema,
    },
    403: {
      ...caseNotFoundSchema,
    },
  },
};

export const closeCaseSchema: FastifySchema = {
  summary: "Manager closes case",
  description: "Manager closes case",
  tags: ["case"],
  params: {
    ...paramsSchema,
  },
  body: caseStatusSchema,
  response: {
    200: {
      ...replySchema,
    },
    403: {
      ...caseNotFoundSchema,
    },
  },
};

export const getCasesToDoSchema: FastifySchema = {
  summary: "Get TODO list",
  description: "Get TODO list",
  tags: ["case"],
  params: {
    ...paramsUserIdSchema,
  },
  response: {
    200: {
      ...replyListSchema,
    },
  },
};

export const getCoordinatesSchema: FastifySchema = {
  summary: "Get coordinates by users cases",
  description: "Get coordinates by users cases",
  tags: ["case"],
  params: {
    ...paramsUserIdSchema,
  },
  response: {
    200: {
      ...replyCoordinatesSchema,
    },
  },
}
