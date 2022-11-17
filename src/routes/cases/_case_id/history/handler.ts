import { type RouteHandler } from "fastify";
import type { Params, ReplyList } from './schema'

export const getCaseHistoryHandler: RouteHandler<{
    Params: Params
    Reply: ReplyList
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);

    const records = await req.server.prisma.caseHistory.findMany({
        where: {
            case_id: id,
        }
    });
    reply
        .code(200)
        .send({ success: true, message: "List of history", casesHistory: records });
};