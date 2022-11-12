import { build } from '../../helper';

describe('appointments route', () => {
    const app = build();

    describe('GET /appointments', () => {

        test('check status code: 200', async () => {
            const res = await app.inject({
                url: '/appointments',
            });
            await expect(res.statusCode).toEqual(200);
        });

        test('check message', async () => {
            const res = await app.inject({
                url: '/appointments',
            });
            await expect(JSON.parse(res.payload).message).toBe('List of appointments');
        });
    })

});