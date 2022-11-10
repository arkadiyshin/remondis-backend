import type { FastifyInstance } from 'fastify'
import {
    getCaseItemsSchema
} from './schema.js'

import {
    getCaseItemsHandler

} from './handler.js'


export default async (app: FastifyInstance) => {
    
    // items
    // 
    app.get('/', { schema: getCaseItemsSchema }, getCaseItemsHandler)
    // app.get('/:case_id/items/:room', { schema: getCaseItemSchema }, getCaseItemHandler)
    // app.post('/:case_id/items', { schema: postCaseItemSchema }, addCaseItemHandler)
    // app.put('/:case_id/items/:room', { schema: updateCaseItemSchema }, updateCaseItemHandler)
    // app.delete('/:case_id/items/:room'', { schema: deleteCaseItemSchema }, deleteCaseItemHandler)
}