import type { FastifyInstance } from 'fastify'
import { getCaseHistorySchema } from './schema.js'
import { getCaseHistoryHandler } from './handler.js'


export default async (app: FastifyInstance) => {
    
    // history
    app.get('/', { schema: getCaseHistorySchema }, getCaseHistoryHandler)

}