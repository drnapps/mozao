import axios from "axios";

export interface ProcessEnv {
    [key: string]: string | undefined
}

function getAPIClient(ctx?: any) {

    const api = axios.create({
        baseURL: process.env["API_URL"]
    })
    
    api.interceptors.request.use(config => {
        console.log(config);
        return config;
    })

    return api;
}

export const api = getAPIClient()