import httpServices from "./httpServices";
import config from '../config.json';

export function getMovie(id) {
    return httpServices.get(`${config.apiEndpoint}movies/${id}`);
}

export function getMovies() {
    return httpServices.get(`${config.apiEndpoint}movies`);
}

export function saveMovie(movie){
    const movieid = movie._id ? movie._id : false;
    delete movie._id;

    if(movieid){
        return httpServices.put(`${config.apiEndpoint}movies/${movieid}`, movie);
    }
    return httpServices.post(`${config.apiEndpoint}movies`, movie);
}