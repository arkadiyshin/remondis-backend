import type { FastifyInstance } from 'fastify'
import {
    caseNewSchema,
    caseSchema,
    caseExtendSchema,
    getCasesSchema,
    getCaseSchema,
    postCaseSchema,
    updateCaseSchema,
    changeCaseSchema,
    //deleteCaseSchema,
    assignCaseSchema,
    declineCaseSchema,
    acceptCaseSchema,
    readyCaseSchema,
    quoteCaseSchema,
    closeCaseSchema,
    getCasesToDoSchema,
} from './schema'

import {
    getCasesHandler,
    getCaseHandler,
    addCaseHandler,
    updateCaseHandler,
    //deleteCaseHandler,
    changeCaseHandler,
    assignCaseHandler,
    declineCaseHandler,
    acceptCaseHandler,
    readyCaseHandler,
    quoteCaseHandler,
    closeCaseHandler,
    getCasesToDoHandler,

} from './handler'


export default async (app: FastifyInstance) => {
    
    app.addSchema(caseNewSchema);
    app.addSchema(caseExtendSchema);
    app.addSchema(caseSchema);

    app.get('/', { schema: getCasesSchema }, getCasesHandler)
    app.get('/ToDo/:user_id', { schema: getCasesToDoSchema }, getCasesToDoHandler)
    app.get('/:case_id', { schema: getCaseSchema }, getCaseHandler)
    app.post('/', { schema: postCaseSchema }, addCaseHandler)
    app.put('/:case_id', { schema: updateCaseSchema }, updateCaseHandler)
    app.patch('/:case_id', { schema: changeCaseSchema }, changeCaseHandler)
    //app.delete('/:case_id', { schema: deleteCaseSchema }, deleteCaseHandler)

    app.patch('/:case_id/assign', { schema: assignCaseSchema }, assignCaseHandler)
    app.patch('/:case_id/decline', { schema: declineCaseSchema }, declineCaseHandler)
    app.patch('/:case_id/accept', { schema: acceptCaseSchema }, acceptCaseHandler)
    app.patch('/:case_id/ready', { schema: readyCaseSchema }, readyCaseHandler)
    app.patch('/:case_id/quote', { schema: quoteCaseSchema }, quoteCaseHandler)
    app.patch('/:case_id/close', { schema: closeCaseSchema }, closeCaseHandler)

}