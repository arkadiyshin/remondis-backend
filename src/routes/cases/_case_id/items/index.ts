import type { FastifyInstance } from 'fastify'
import {
    getCaseItemsSchema,
    getCaseItemSchema,
    postCaseItemSchema,
    updateCaseItemSchema,
    deleteCaseItemSchema,
    caseItemSchema,
    caseItemNotFoundSchema,
} from './schema.js'

import {
    getCaseItemsHandler,
    getCaseItemHandler,
    addCaseItemHandler,
    updateCaseItemHandler,
    deleteCaseItemHandler,
} from './handler.js'


export default async (app: FastifyInstance) => {
    
    app.addSchema(caseItemSchema);
    app.addSchema(caseItemNotFoundSchema);
    
    app.get('/', { schema: getCaseItemsSchema }, getCaseItemsHandler)
    app.get('/:room', { schema: getCaseItemSchema }, getCaseItemHandler)
    app.post('/', { schema: postCaseItemSchema }, addCaseItemHandler)
    app.put('/:room', { schema: updateCaseItemSchema }, updateCaseItemHandler)
    app.delete('/:room', { schema: deleteCaseItemSchema }, deleteCaseItemHandler)
}