import httpServices from "./httpServices";
import { apiUrl } from '../config.json';

export function getGenres() {
    return httpServices.get(`${apiUrl}genres`);
}