import httpServices from "./httpServices";
import jwtDecode from "jwt-decode";
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}auth`;

const tokenKey = "token";

// export function login(email, password){
//     return httpServices.post(apiEndpoint, {email,password})
// }

export async function login(email, password) {
    const { data: jwt } = await httpServices.post(apiEndpoint, { email, password })
    localStorage.setItem(tokenKey, jwt)
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt)
}

export function logout() {
    localStorage.removeItem(tokenKey)
}


export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        const user = jwtDecode(jwt) // Si la variable token esta vacia (que no exista en el localStorage el token)
        // entonces al hacer esto jwtDecode(null) habra un error, podriamos pensar que antes de ejecutar esta linea
        // de codigo comprobar si el token existe o no, en el caso de no existir reedireccionar, el problema es que
        // si nos fijamos bien este archivo es el App.js osea que SIEMPRE se va a ejecutar y si bien podemos reedireccionar
        // eso no evitara que se arroge un error, podemos usar un try catch para evitar el error y despues reedireccionar al
        // login
        return user
    } catch (ex) {
        return null
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}