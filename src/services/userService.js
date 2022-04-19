import httpServices from "./httpServices";
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}users`;

export function register(user){
    return httpServices.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    })
}