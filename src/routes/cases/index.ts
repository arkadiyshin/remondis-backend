import type { FastifyInstance } from 'fastify'
import {
    CaseCoreSchema,
    CaseExtendSchema,
    CaseFullSchema,
    CaseItemCoreSchema,
    CaseItemFullSchema,
    getCasesSchema,
    getCaseSchema,
    postCaseSchema,
    updateCaseSchema,
    changeCaseSchema,
    deleteCaseSchema,
    assignCaseSchema,
    declineCaseSchema,
    acceptCaseSchema,
    submitCaseSchema,
    quoteCaseOpts,
    closeCaseOpts
    


} from './schema.js'

import {
    getCasesHandler,
    getCaseHandler,
    addCaseHandler,
    updateCaseHandler,
    deleteCaseHandler,
    changeCaseHandler,
    assignCaseHandler,
    declineCaseHandler,
    acceptCaseHandler,
    submitCaseHandler,
    quoteCaseHandler,
    closeCaseHandler
} from './handler.js'

export default async (app: FastifyInstance) => {
    
    app.addSchema(CaseCoreSchema);
    app.addSchema(CaseExtendSchema);
    app.addSchema(CaseFullSchema);
    app.addSchema(CaseItemCoreSchema);
    app.addSchema(CaseItemFullSchema);

    app.get('/', { schema: getCasesSchema }, getCasesHandler)
    app.get('/:case_id', { schema: getCaseSchema }, getCaseHandler)
    app.post('/', { schema: postCaseSchema }, addCaseHandler)
    app.put('/:case_id', { schema: updateCaseSchema }, updateCaseHandler)
    app.delete('/:case_id', { schema: deleteCaseSchema }, deleteCaseHandler)

    app.patch('/:case_id', { schema: changeCaseSchema }, changeCaseHandler)

    app.patch('/:case_id/assign', { schema: assignCaseSchema }, assignCaseHandler)
    app.patch('/:case_id/decline', { schema: declineCaseSchema }, declineCaseHandler)
    app.patch('/:case_id/accept', { schema: acceptCaseSchema }, acceptCaseHandler)
    app.patch('/:case_id/submit', { schema: submitCaseSchema }, submitCaseHandler)
    app.patch('/:case_id/quote', { schema: quoteCaseOpts }, quoteCaseHandler)
    app.patch('/:case_id/close', { schema: closeCaseOpts }, closeCaseHandler)

}