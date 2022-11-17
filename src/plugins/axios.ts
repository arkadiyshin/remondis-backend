import fp from "fastify-plugin";
import { FastifyPluginAsync } from 'fastify';
import axios, { AxiosInstance } from 'axios';

declare module 'fastify' {
    interface FastifyInstance {
        axios: AxiosInstance
    }
}

const axiosPlugin: FastifyPluginAsync = fp(async (server, options) => {

    //const { ...defaultArgs } = options;
    const instance = axios.create({
        baseURL: 'https://api.maptiler.com/',
        timeout: 1000,
        headers: { 'content-type': 'application/json' }
    });
    server.decorate('axios', instance)

})

export default axiosPlugin
