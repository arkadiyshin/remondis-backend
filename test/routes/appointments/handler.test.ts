import { build } from '../../helper';

describe('API: /appointments', () => {
    const app = build();

    test('GET /', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/appointments',
        });
        await expect(res.statusCode).toBe(200);
        await expect(res.json()).toEqual(expect.objectContaining({
            success: true,
            message: 'List of appointments',
        }));
        await expect(res.json().appointments).toBeInstanceOf(Array);
    });

});