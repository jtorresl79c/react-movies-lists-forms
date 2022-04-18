import httpServices from "./httpServices";
// import config from '../config.json';
import { apiEndpoint } from '../config.json';

export function getMovie(id) {
    return httpServices.get(`${apiEndpoint}movies/${id}`);
}

export function getMovies() {
    return httpServices.get(`${apiEndpoint}movies`);
}

export function saveMovie(movie){
    const movieid = movie._id ? movie._id : false;
    delete movie._id;

    if(movieid){
        return httpServices.put(`${apiEndpoint}movies/${movieid}`, movie);
    }
    return httpServices.post(`${apiEndpoint}movies`, movie);
}

export function deleteMovie(id) {
    return httpServices.delete(`${apiEndpoint}movies/${id}`);
}