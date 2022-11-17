import { build } from '../../../../helper';

describe('cases/:case_id/history route', () => {
    const app = build();

    test('GET /', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/cases/1/history',
        });
        await expect(res.statusCode).toBe(200);
        await expect(res.json()).toEqual(expect.objectContaining({
            success: true,
            message: 'List of history',
        }));
        await expect(res.json().casesHistory).toBeInstanceOf(Array);
    });

});