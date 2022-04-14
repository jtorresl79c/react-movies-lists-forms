import httpServices from "./httpServices";
export async function getGenres() {
    return httpServices.get('http://localhost:3900/api/genres')
}