import * as dotenv from "dotenv";
dotenv.config();

export const getEnvValue = (keyname : string) : any => {
    
    const envVar = process.env[keyname];
    if (!envVar) {
        throw new Error(`Check your <.env> file. Configuration must include: ${keyname}`)
    }
    return envVar;
}

export const APP_PORT = getEnvValue('APP_PORT');
export const DATABASE_URL = getEnvValue('DATABASE_URL');
export const JWT_SECRET_KEY = getEnvValue('JWT_SECRET_KEY');
export const SENDGRID_API_KEY = getEnvValue('SENDGRID_API_KEY');
export const MAPTILER_API_KEY = getEnvValue('MAPTILER_API_KEY');
export const FRONTEND_URL = getEnvValue('FRONTEND_URL');
