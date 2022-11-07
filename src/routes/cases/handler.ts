import { type RouteHandler } from 'fastify'
import type { Params, Querystring, BodyNew, BodyChange, Reply, ReplyList, CaseNotFound } from './schema'


// Querystring
// Params
// Body 
// Reply

export const getCasesHandler: RouteHandler<{
    Querystring: Querystring
    //Reply: ReplyList
}> = async function (req, reply) {
    const cases = await req.server.prisma.case.findMany();
    //console.log(cases)
    reply.send({ cases: cases })
    //reply.send('ok');
}

export const getCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
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

export const submitCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const quoteCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const closeCaseHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}