import * as dotenv from "dotenv";
dotenv.config();

const getEnvValue = (keyname : string) : any => {
    
    const envVar = process.env[keyname];
    if (!envVar) {
        throw new Error(`Configuration must include ${keyname}`)
    }
    return envVar;
}

export const APP_PORT = getEnvValue('APP_PORT');
export const DATABASE_URL = getEnvValue('DATABASE_URL');
export const JWT_SECRET_KEY = getEnvValue('JWT_SECRET_KEY');

export const SMTP_SERVER = getEnvValue('SMTP_SERVER');
export const SMTP_PORT = getEnvValue('SMTP_PORT');
export const SMTP_USER = getEnvValue('SMTP_USER');
export const SMTP_PASS = getEnvValue('SMTP_PASS');
