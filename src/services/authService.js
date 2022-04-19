import httpServices from "./httpServices";
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}auth`;

export function login(email, password){
    return httpServices.post(apiEndpoint, {email,password})
}