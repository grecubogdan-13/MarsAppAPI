import {Param} from "./Interfaces";
import {checkNames} from "./Utils";

const API_KEY = "TxbNgclp1JXLSnghP5ecigSdEUvdMNcabY3p1lno";
const BASE_API = "https://api.nasa.gov/mars-photos/api/v1/";

export function requestConstructor(parameters: Param, type: string) {
    if (checkNames(parameters.name!)) {
        switch (type) {
            case "RoverSolAndCamera":
                return `${BASE_API}rovers/${parameters.name}/photos?sol=${parameters.sol}&page=1&camera=${parameters.camera}&api_key=${API_KEY}`
                break;
            case "RoverAndSol":
                return `${BASE_API}rovers/${parameters.name}/photos?sol=${parameters.sol}&page=1&api_key=${API_KEY}`
                break;
            case "Rover":
                return `${BASE_API}rovers/${parameters.name}?api_key=${API_KEY}`
                break;
            default:
                return "";
        }
    } else return "";
}