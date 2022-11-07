import { type RouteHandler } from 'fastify'
import type { Params, Querystring, BodyNew, BodyChange, Reply, ReplyList, CaseNotFound } from './schema'


export const getCasesHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    //console.log(req.query)

    const cases = await req.server.prisma.case.findMany();
    reply.send({ cases: cases })
}

export const getCaseHandler: RouteHandler<{
    Params: Params
    Reply: Reply | CaseNotFound
}> = async function (req, reply) {

    const { case_id } = req.params
    const id = parseInt(case_id);

    const findedCase = await req.server.prisma.case.findUnique({
        where: {
            id: id,
        },
    });
    
    if (findedCase)
        reply.code(200).send({ success: true, message: 'Case not found', case: findedCase })
    else
        reply.code(404).send({ success: false, message: 'Case not found' })
}

export const addCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const updateCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const changeCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const deleteCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const assignCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const declineCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const acceptCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const readyCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const quoteCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const closeCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}