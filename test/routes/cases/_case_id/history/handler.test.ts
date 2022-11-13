import { build } from '../../../../helper';

describe('cases/:case_id/history route', () => {
    const app = build();

    describe('GET / ', () => {

        test('check status code: 200', async () => {
            const res = await app.inject({
                url: '/cases/1/history',
            });
            await expect(res.statusCode).toEqual(200);
        });

        test('check success', async () => {
            const res = await app.inject({
                url: '/cases/1/history',
            });
            console.log(JSON.parse(res.payload))
            await expect(JSON.parse(res.payload).success).toBe(true);
        });

        test('check message', async () => {
            const res = await app.inject({
                url: '/cases/1/history',
            });
            await expect(JSON.parse(res.payload).message).toBe('List of history');
        });

        test('reply object should be an array', async () => {
            const res = await app.inject({
                url: '/cases/1/history',
            });
            await expect(JSON.parse(res.payload).casesHistory).toBeInstanceOf(Array);
        });
    })

});