import { type RouteHandler } from "fastify";
import type {
  Params,
  Querystring,
  BodyNew,
  BodyChange,
  Reply,
  ReplyList,
  CaseNotFound,
} from "./schema";

export const getCasesHandler: RouteHandler<{
  Querystring: Querystring;
  Reply: ReplyList;
}> = async function (req, reply) {  

  const cases = await req.server.prisma.case.findMany();
  reply.send({ cases: cases });
};

export const getCaseHandler: RouteHandler<{
  Params: Params;
  Reply: Reply | CaseNotFound;
}> = async function (req, reply) {

  const { case_id } = req.params;
  const id = parseInt(case_id);

  const findedCase = await req.server.prisma.case.findUnique({
    where: {
      case_id: id,
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
  Body: BodyChange;
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

export const deleteCaseHandler: RouteHandler<{
  Params: Params;
}> = async function (req, reply) {
  const { case_id } = req.params;
  const id = parseInt(case_id);
  const deletedCase = await req.server.prisma.case.delete({
    where: {
      case_id: id,
    },
  });
  if (deletedCase)
    reply.code(200).send({ success: true, message: "Case is deleted" });
  else reply.code(404).send({ success: false, message: "Case is not found" });
};

export const assignCaseHandler: RouteHandler = async function (req, reply) {
  reply.send("ok");
};

export const declineCaseHandler: RouteHandler = async function (req, reply) {
  reply.send("ok");
};

export const acceptCaseHandler: RouteHandler = async function (req, reply) {
  reply.send("ok");
};

export const readyCaseHandler: RouteHandler = async function (req, reply) {
  reply.send("ok");
};

export const quoteCaseHandler: RouteHandler = async function (req, reply) {
  reply.send("ok");
};

export const closeCaseHandler: RouteHandler = async function (req, reply) {
  reply.send("ok");
};
