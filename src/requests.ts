import {Param} from "./Interfaces";
const api_key = "TxbNgclp1JXLSnghP5ecigSdEUvdMNcabY3p1lno";
const base_api = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

export function requestConstructor (parameters: Param, type: string) {
    switch (type) {
        case "RoverSolAndCamera":
            return `${base_api}${parameters.name}/photos?sol=${parameters.sol}&page=1&camera=${parameters.camera}&api_key=${api_key}`
            break;
        case "RoverAndSol":
            return `${base_api}${parameters.name}/photos?sol=${parameters.sol}&page=1&api_key=${api_key}`
            break;
        case "Rover":
            return `${base_api}${parameters.name}?api_key=${api_key}`
            break;
        default:
            return "";
    }
}