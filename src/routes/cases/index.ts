import type { FastifyInstance } from 'fastify'
import {
    getCasesSchema,
    getCaseSchema, 
    postCaseSchema,
    updateCaseSchema,
    changeCaseSchema,
    deleteCaseSchema

} from './schema.js'
import {
    getCasesHandler,
    getCaseHandler,
    addCaseHandler,
    updateCaseHandler,
    deleteCaseHandler
} from './handler.js'

export default async (fastify: FastifyInstance) => {
    //fastify.addSchema()
    fastify.get('/cases/', { schema: getCasesSchema }, getCasesHandler)
    fastify.get('/cases/:postid', { schema: getCaseSchema }, getCaseHandler)
    fastify.post('/cases/', { schema: postCaseSchema }, addCaseHandler)
    fastify.put('/cases/:postid', { schema: updateCaseSchema }, updateCaseHandler)
    fastify.delete('/cases/:postid', { schema: deleteCaseSchema }, deleteCaseHandler)
}