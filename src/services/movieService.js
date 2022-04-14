import httpServices from "./httpServices";
export async function getMovies() {
    return httpServices.get('http://localhost:3900/api/movies');
}