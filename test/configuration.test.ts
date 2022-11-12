import {getEnvValue} from '../src/configuration'

describe('configuration ', () => {

    test('checking for an existing value', () => {
        expect(getEnvValue('APP_PORT')).toBe('3000');
    });

    test('checking for a non-existent value', () => {
        expect(() => getEnvValue('NonExistenValue')).toThrow('Check your <.env> file. Configuration must include: NonExistenValue');
    });
});