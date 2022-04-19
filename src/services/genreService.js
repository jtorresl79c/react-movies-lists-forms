import httpServices from "./httpServices";
import { apiEndpoint } from '../config.json';

export function getGenres() {
    return httpServices.get(`${apiEndpoint}genres`);
}