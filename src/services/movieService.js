import httpServices from "./httpServices";
// import config from '../config.json';
import { apiUrl } from '../config.json';

export function getMovie(id) {
    return httpServices.get(`${apiUrl}movies/${id}`);
}

export function getMovies() {
    return httpServices.get(`${apiUrl}movies`);
}

export function saveMovie(movie){
    // Recuerda que movie es en si una referencia me parece, recuerda la inmutabilidad y que hay
    // que respetarla, por lo tanto hacemos una copia del objeto movie y despues eliminamos la propiedad movie._id
    // const movieid = movie._id ? movie._id : false;
    // delete movie._id;

    const movieid = movie._id

    const body = { ...movie }; // Aqui se hace la copia del array, y ya no lo estamos referenciando
    delete body._id

    if(movieid){
        return httpServices.put(`${apiUrl}movies/${movieid}`, body);
    }

    
    return httpServices.post(`${apiUrl}movies`, body);
}

export function deleteMovie(id) {
    return httpServices.delete(`${apiUrl}movies/${id}`);
}