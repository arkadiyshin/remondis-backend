import { FastifyReply, FastifyRequest, type RouteHandler } from "fastify";
import type { Params, ParamsReq, Querystring, Body, BodyNew, Reply, ReplyList, CaseItemNotFound } from './schema'

export const getCaseItemsHandler: RouteHandler<{
    Params: ParamsReq
    Reply: ReplyList
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);

    const records = await req.server.prisma.caseItem.findMany({
        where: {
            case_id: id,
        }
    });
    reply
        .code(200)
        .send({ success: true, message: "", caseItems: records });

};

export const getCaseItemHandler: RouteHandler<{
    Params: Params
    Reply: Reply
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);

    const record = await req.server.prisma.caseItem.findUnique({
        where: {
            caseRoom : {
                case_id: id,
                room: room_id,
            },
        }
    });

    if (record) {
        reply
            .code(200)
            .send({ success: true, message: "Case item found", caseItem: record });
    } else {
        reply
            .code(404)
            .send({ success: false, message: "Case item not found" });
    }

};

export const addCaseItemHandler: RouteHandler<{
    Params: Params
    Body: BodyNew
    Reply: Reply
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);

    const record = await req.server.prisma.caseItem.create({
        data: {
            case_id: id,
            ...req.body,
        }
    });
    if (record)
        reply
            .code(200)
            .send({ success: true, message: "Case item added", caseItem: record });
    else
        reply
            .code(404)
            .send({ success: false, message: "Case item not added" });
};

export const updateCaseItemHandler: RouteHandler<{
    Params: Params
    Body: Body
    Reply: Reply
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);

    const record = await req.server.prisma.caseItem.update({
        data: {
            ...req.body,
        },
        where: {
            caseRoom : {
                case_id: id,
                room: room_id,
            },
        }
    });

    if (record)
        reply
            .code(200)
            .send({ success: true, message: "Case item changed", caseItem: record });
    else reply
            .code(404)
            .send({ success: false, message: "Case item not found" });
};

export const deleteCaseItemHandler: RouteHandler<{
    Params: Params
    Reply: Reply
}> = async function (req, reply) {
    
    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);

    const record = await req.server.prisma.caseItem.delete({
        where: {
            caseRoom : {
                case_id: id,
                room: room_id,
            },
        }
    });

    if (record)
        reply
            .code(204)
            .send({ success: true, message: "Case item deleted"});
    else reply
            .code(404)
            .send({ success: false, message: "Case item not deleted" });
};

