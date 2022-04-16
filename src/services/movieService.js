import httpServices from "./httpServices";
import config from '../config.json';

export function getMovie(id) {
    return httpServices.get(`${config.apiEndpoint}movies/${id}`);
}

export function getMovies() {
    return httpServices.get(`${config.apiEndpoint}movies`);
}

export function saveMovie(){
    return null
}