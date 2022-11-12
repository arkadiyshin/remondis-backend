import type { FastifyInstance } from 'fastify'
import { getCaseHistorySchema } from './schema'
import { getCaseHistoryHandler } from './handler'


export default async (app: FastifyInstance) => {
    
    // history
    app.get('/', { schema: getCaseHistorySchema }, getCaseHistoryHandler)

}