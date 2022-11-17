import { build } from '../../helper';

describe('API: /cases', () => {
    const app = build();

    test('GET /', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/cases',
        });
        expect(res.statusCode).toBe(200);
        expect(res.json()).toEqual(
            expect.objectContaining(
                {
                    success: true,
                    message: 'List of cases',
                    cases: expect.arrayContaining(
                        [expect.objectContaining({ client_phone: expect.any(String) })])

                }
            ));
        expect(res.json().cases).toBeInstanceOf(Array);
    });

    test('GET /:case_id found', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/cases/1',
        });
        await expect(res.statusCode).toBe(200);
        await expect(res.json()).toEqual(expect.objectContaining({
            success: true,
            message: 'Case found',
        }));
        await expect(res.json().case).toBeInstanceOf(Object);
    });

    test('GET /:case_id not found', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/cases/9999',
        });
        await expect(res.statusCode).toBe(404);
        await expect(res.json()).toEqual(expect.objectContaining({
            success: false,
            message: 'Case not found',
        }));
    });

});