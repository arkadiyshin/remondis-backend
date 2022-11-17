import { FastifyReply, FastifyRequest, type RouteHandler } from "fastify";
import {
  MANAGER_ACTIONS,
  INSPECTOR_ACTIONS,
  MANAGER_TODO_STATES,
  INSPECTOR_TODO_STATES,
} from "../../constant";
import {
  STATE_CREATED,
  STATE_ASSIGNED,
  STATE_CONFIRMED,
  STATE_ONGOING,
  STATE_READY,
  STATE_QUOTED,
  STATE_CLOSED,
} from "../../constant";
import type {
  Params,
  ParamsUserId,
  Querystring,
  BodyNew,
  BodyChange,
  BodyStatus,
  Reply,
  ReplyList,
  CaseNotFound,
} from "./schema";

export const getCasesHandler: RouteHandler<{
  Querystring: Querystring;
  Reply: ReplyList;
}> = async function (req, reply) {
  const {
    date_from,
    date_to,
    state_id,
    state,
    inspector_id,
    inspector,
    manager_id,
    manager,
  } = req.query;

  const cases = await req.server.prisma.case.findMany({
    where: {
      created_at: {
        gte: date_from,
        lte: date_to,
      },
      state_id: state_id,
      State: {
        title: state,
      },
      inspector_id: inspector_id,
      Inspector: {
        username: inspector,
      },
      manager_id: manager_id,
      Manager: {
        username: manager,
      },
    },
  });
  reply.send({ success: true, message: "List of cases", cases: cases });
};

export const getCaseHandler: RouteHandler<{
  Params: Params;
  Reply: Reply | CaseNotFound;
}> = async function (req, reply) {
  const { case_id } = req.params;
  const id = parseInt(case_id);

  const findedCase = await req.server.prisma.case.findUnique({
    where: {
      id: id,
    },
  });

  if (findedCase)
    reply
      .code(200)
      .send({ success: true, message: "Case found", case: findedCase });
  else reply.code(404).send({ success: false, message: "Case not found" });
};

export const addCaseHandler: RouteHandler<{
  Body: BodyNew;
  Reply: Reply;
}> = async function (req, reply) {
  console.log(req.body);

  const newCase = await req.server.prisma.case.create({
    data: {
      ...req.body,
    },
  });

  if (newCase)
    reply
      .code(200)
      .send({ success: true, message: "Case created", case: newCase });
  else
    reply.code(404).send({ success: false, message: "Case was not created" });
};

export const updateCaseHandler: RouteHandler<{
  Body: BodyNew;
  Params: Params;
}> = async function (req, reply) {
  const { case_id } = req.params;
  const id = parseInt(case_id);
  const changedCase = await req.server.prisma.case.upsert({
    create: {
      ...req.body,
    },
    update: {
      ...req.body,
    },
    where: {
      id: id,
    },
  });
  if (changedCase)
    reply
      .code(200)
      .send({ success: true, message: "Case is changed", case: changedCase });
  else reply.code(404).send({ success: false, message: "Case is not found" });
};

export const changeCaseHandler: RouteHandler<{
  Body: BodyChange;
  Params: Params;
}> = async function (req, reply) {
  const { case_id } = req.params;
  const id = parseInt(case_id);
  const changedCase = await req.server.prisma.case.update({
    where: {
      id: id,
    },
    data: {
      ...req.body,
    },
  });
  if (changedCase)
    reply
      .code(200)
      .send({ success: true, message: "Case is changed", case: changedCase });
  else reply.code(404).send({ success: false, message: "Case is not found" });
};

/* export const deleteCaseHandler: RouteHandler<{
  Params: Params;
}> = async function (req, reply) {
  const { case_id } = req.params;
  const id = parseInt(case_id);
  const deletedCase = await req.server.prisma.case.delete({
    where: {
      id: id,
    },
  });
  if (deletedCase)
    reply.code(200).send({ success: true, message: "Case is deleted" });
  else reply.code(404).send({ success: false, message: "Case is not found" });
}; */

const hasRights = async function (
  nextStateArg: number,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = req.params as Params;
  const body = req.body as BodyStatus;

  const { case_id } = params;
  const id = parseInt(case_id);

  const foundCase = await req.server.prisma.case.findUnique({
    where: {
      id: id,
    },
  });

  if (!foundCase) {
    reply.code(404).send({
      success: false,
      message: "Case not found",
    });
    return; // use return for types error reason
  }

  const user = await req.server.prisma.user.findUnique({
    where: {
      id: body.user_id,
    },
  });

  if (!user) {
    reply.code(404).send({
      success: false,
      message: "User not found",
    });
    return; // use return for types error reason
  }

  const currentState = foundCase.state_id as number;
  const nextState = nextStateArg;
  console.log(currentState);
  console.log(nextState);
  const transition = await req.server.prisma.transition.findFirst({
    where: {
      state_id: currentState,
      next_state_id: nextState,
    },
  });
  if (transition) {
    const transitionRights = await req.server.prisma.transitionAccess.findFirst(
      {
        where: {
          role: user.role!,
          transition_id: transition.id,
        },
      }
    );
    return transitionRights;
  } else {
    reply.code(403).send({
      success: false,
      message: "There is no such status transitions for case",
    });
  }
};

export const assignCaseHandler: RouteHandler<{
  Body: BodyStatus;
  Params: Params;
}> = async function (req, reply) {
  const id = parseInt(req.params.case_id);
  const nextStateId = 2; // Assigned
  const transitionRights = await hasRights(nextStateId, req, reply);
  console.log(transitionRights);
  if (transitionRights) {
    const assignedCase = await req.server.prisma.case.update({
      where: {
        id: id,
      },
      data: {
        inspector_id: req.body.inspector_id,
        state_id: nextStateId,
      },
    });
    const foundCase = await req.server.prisma.case.findUnique({
      where: {
        id: id,
      },
    });
    if (assignedCase) {
      reply
        .code(200)
        .send({ success: true, message: "Case is assigned", case: foundCase });
    } else {
      reply.code(404).send({ success: false, message: "Case is not found" });
    }
  } else {
    reply.code(403).send({ success: false, message: "You do not have rights" });
  }
};

export const declineCaseHandler: RouteHandler<{
  Body: BodyStatus;
  Params: Params;
}> = async function (req, reply) {
  const id = parseInt(req.params.case_id);
  const nextStateId = 1; // Created
  const transitionRights = await hasRights(nextStateId, req, reply);
  if (transitionRights) {
    const declinedCase = await req.server.prisma.case.update({
      where: {
        id: id,
      },
      data: {
        state_id: nextStateId,
      },
    });
    const foundCase = await req.server.prisma.case.findUnique({
      where: {
        id: id,
      },
    });
    if (declinedCase) {
      reply
        .code(200)
        .send({ success: true, message: "Case is declined", case: foundCase });
    } else {
      reply.code(404).send({ success: false, message: "Case is not found" });
    }
  } else {
    reply.code(403).send({ success: false, message: "You do not have rights" });
  }
};

export const acceptCaseHandler: RouteHandler<{
  Body: BodyStatus;
  Params: Params;
}> = async function (req, reply) {
  const id = parseInt(req.params.case_id);
  const nextStateId = 3; // Accepted
  const transitionRights = await hasRights(nextStateId, req, reply);
  if (transitionRights) {
    const AcceptedCase = await req.server.prisma.case.update({
      where: {
        id: id,
      },
      data: {
        state_id: nextStateId,
      },
    });
    const foundCase = await req.server.prisma.case.findUnique({
      where: {
        id: id,
      },
    });
    if (AcceptedCase) {
      reply
        .code(200)
        .send({ success: true, message: "Case is accepted", case: foundCase });
    } else {
      reply.code(404).send({ success: false, message: "Case is not found" });
    }
  } else {
    reply.code(403).send({ success: false, message: "You do not have rights" });
  }
};

export const readyCaseHandler: RouteHandler<{
  Body: BodyStatus;
  Params: Params;
}> = async function (req, reply) {
  const id = parseInt(req.params.case_id);
  const nextStateId = 5; // Ready
  const transitionRights = await hasRights(nextStateId, req, reply);
  if (transitionRights) {
    const ReadyCase = await req.server.prisma.case.update({
      where: {
        id: id,
      },
      data: {
        state_id: nextStateId,
      },
    });
    const foundCase = await req.server.prisma.case.findUnique({
      where: {
        id: id,
      },
    });
    if (ReadyCase) {
      reply
        .code(200)
        .send({ success: true, message: "Case is ready", case: foundCase });
    } else {
      reply.code(404).send({ success: false, message: "Case is not found" });
    }
  } else {
    reply.code(403).send({ success: false, message: "You do not have rights" });
  }
};

export const quoteCaseHandler: RouteHandler<{
  Body: BodyStatus;
  Params: Params;
}> = async function (req, reply) {
  const id = parseInt(req.params.case_id);
  const nextStateId = 6; // Quoted
  const transitionRights = await hasRights(nextStateId, req, reply);
  if (transitionRights) {
    const QuotedCase = await req.server.prisma.case.update({
      where: {
        id: id,
      },
      data: {
        state_id: nextStateId,
      },
    });
    const foundCase = await req.server.prisma.case.findUnique({
      where: {
        id: id,
      },
    });
    if (QuotedCase) {
      reply
        .code(200)
        .send({ success: true, message: "Case is quoted", case: foundCase });
    } else {
      reply.code(404).send({ success: false, message: "Case is not found" });
    }
  } else {
    reply.code(403).send({ success: false, message: "You do not have rights" });
  }
};

export const closeCaseHandler: RouteHandler<{
  Body: BodyStatus;
  Params: Params;
}> = async function (req, reply) {
  const id = parseInt(req.params.case_id);
  const nextStateId = 7; // Closed
  const transitionRights = await hasRights(nextStateId, req, reply);
  if (transitionRights) {
    const ClosedCase = await req.server.prisma.case.update({
      where: {
        id: id,
      },
      data: {
        state_id: nextStateId,
      },
    });
    const foundCase = await req.server.prisma.case.findUnique({
      where: {
        id: id,
      },
    });
    if (ClosedCase) {
      reply
        .code(200)
        .send({ success: true, message: "Case is closed", case: foundCase });
    } else {
      reply.code(404).send({ success: false, message: "Case is not found" });
    }
  } else {
    reply.code(403).send({ success: false, message: "You do not have rights" });
  }
};

export const getCasesToDoHandler: RouteHandler<{
  Params: ParamsUserId;
  Reply: ReplyList;
}> = async function (req, reply) {
  const { user_id } = req.params;
  const id = parseInt(user_id);

  const user = await req.server.prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    reply.code(404).send({ success: false, message: "User not found" });
    return;
  }

  const role = user.role;
  // hardcode!!
  const managerToDoStates = [1, 2, 4, 5];
  const inspectorToDoStates = [2, 4];

  const roleCond =
    role === "manager" ? { manager_id: id } : { inspector_id: id };
  const cases = await req.server.prisma.case.findMany({
    where: {
      AND: [
        { ...roleCond },
        {
          OR: [
            {
              state_id: {
                in:
                  role === "manager" ? managerToDoStates : inspectorToDoStates,
              },
            },
            { AND: [{ state_id: 3 }, { Appointment: null }] },
            {
              AND: [
                { state_id: 3 },
                { Appointment: { is: { date: { lte: new Date() } } } },
              ],
            },
          ],
        },
      ],
    },
    include: {
      Appointment: true,
    },
  });

  reply.send({ success: true, message: "ToDo list", cases });
};
