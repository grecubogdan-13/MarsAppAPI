import {requestConstructor} from "../Services/Requests/requests";
import axios from "axios";
import {photosJSON, roversJSON} from "../Services/Responses/JSONResponseFunctions";
import {photosHTML, roversHTML} from "../Services/Responses/HTMLResponseFunctions";
import {Request, Response} from "express";

export const test = (req: Request, res: Response) => {
    res.send('Hello world !');
}

export const JSONNameAndSol = async (req: Request, res: Response) => {
    let parameters = {
        name: req.params.rover_name,
        sol: req.params.sol
    }
    let api_url = requestConstructor(parameters, "RoverAndSol");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let response = photosJSON(data.photos)
        res.send(response);
    } else {
        res.send("Bad request");
    }
}

export const HTMLNameAndSol = async (req: Request, res: Response) => {
    let parameters = {
        name: req.params.rover_name,
        sol: req.params.sol
    }
    let api_url = requestConstructor(parameters, "RoverAndSol");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let html = photosHTML(data.photos)
        res.send(html);
    } else {
        res.send("Bad request");
    }
}

export const HTMLNameSolAndCamera = async (req: Request, res: Response) => {
    let parameters = {
        name: req.params.rover_name,
        sol: req.params.sol,
        camera: req.params.camera
    }
    let api_url = requestConstructor(parameters, "RoverSolAndCamera");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let response = photosHTML(data.photos)
        res.send(response);
    } else {
        res.send("Bad request");
    }
}

export const JSONNameSolAndCamera = async (req: Request, res: Response) => {
    let parameters = {
        name: req.params.rover_name,
        sol: req.params.sol,
        camera: req.params.camera
    }
    let api_url = requestConstructor(parameters, "RoverSolAndCamera");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let response = photosJSON(data.photos)
        res.send(response);
    } else {
        res.send("Bad request");
    }
}

export const HTMLRover = async (req: Request, res: Response) => {
    let parameters = {
        name: req.params.rover_name
    }
    let api_url = requestConstructor(parameters, "Rover");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let html = roversHTML(data.rover);
        res.send(html);
    } else {
        res.send("Bad request");
    }
}

export const JSONRover = async (req: Request, res: Response) => {
    let parameters = {
        name: req.params.rover_name
    }
    let api_url = requestConstructor(parameters, "Rover");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let html = roversJSON(data.rover);
        res.send(html);
    } else {
        res.send("Bad request");
    }
}