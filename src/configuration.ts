import * as dotenv from "dotenv";
dotenv.config();

const getEnvValue = (keyname : string) : string => {
    
    const envVar = process.env[keyname];
    if (!envVar) {
        throw new Error(`Configuration must include ${keyname}`)
    }
    return envVar;
}

export const JWT_SECRET_KEY = getEnvValue('JWT_SECRET_KEY');
export const APP_PORT = getEnvValue('APP_PORT');
export const DATABASE_URL = getEnvValue('DATABASE_URL');