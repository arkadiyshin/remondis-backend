import type { FastifyInstance } from 'fastify'
import {
    getCaseItemsSchema,
    getCaseItemSchema,
    postCaseItemSchema,
    updateCaseItemSchema,
    deleteCaseItemSchema,
    caseItemSchema,
    caseItemNotFoundSchema,
    casePhotoSchema,
    postCasePhotoSchema,
    updateCasePhotoSchema,
    deleteCasePhotoSchema,

} from './schema'

import {
    getCaseItemsHandler,
    getCaseItemHandler,
    addCaseItemHandler,
    updateCaseItemHandler,
    deleteCaseItemHandler,
    addCasePhotoHandler,
    updateCasePhotoHandler,
    deleteCasePhotoHandler,
} from './handler'


export default async (app: FastifyInstance) => {
    
    app.addSchema(caseItemSchema);
    app.addSchema(caseItemNotFoundSchema);
    app.addSchema(casePhotoSchema);
    
    app.get('/', { schema: getCaseItemsSchema }, getCaseItemsHandler)
    app.get('/:room', { schema: getCaseItemSchema }, getCaseItemHandler)
    app.post('/:room', { schema: postCaseItemSchema }, addCaseItemHandler)
    app.put('/:room', { schema: updateCaseItemSchema }, updateCaseItemHandler)
    app.delete('/:room', { schema: deleteCaseItemSchema }, deleteCaseItemHandler)

    app.post('/:room/photos', { schema: postCasePhotoSchema }, addCasePhotoHandler)
    app.put('/:room/photos', { schema: updateCasePhotoSchema }, updateCasePhotoHandler)
    app.delete('/:room/photos/:photo_id', { schema: deleteCasePhotoSchema }, deleteCasePhotoHandler)
}