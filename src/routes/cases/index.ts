import type { FastifyInstance } from 'fastify'
import {
    getCasesSchema,
    getCaseSchema,
    postCaseSchema,
    updateCaseSchema,
    changeCaseSchema,
    deleteCaseSchema,
    CaseCoreSchema,
    CaseExtendSchema,
    CaseFullSchema,
    CaseItemCoreSchema,
    CaseItemFullSchema

} from './schema.js'

import {
    getCasesHandler,
    getCaseHandler,
    addCaseHandler,
    updateCaseHandler,
    deleteCaseHandler
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
}