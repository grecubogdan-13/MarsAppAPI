import express from "express";
import axios from 'axios';
import {Param} from "./Interfaces";
import {photosHTML, roversHTML} from "./HTMLResponseFunctions";
import {photosJSON, roversJSON} from "./JSONResponseFunctions.TS";
import {requestConstructor} from "./requests";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

app.get('/rovers/:rover_name/sol/:sol/photos', (req,res)=>{
    let parameters: Param = {};
    parameters.name = req.params.rover_name;
    parameters.sol = req.params.sol;
    let api_url = requestConstructor(parameters, "RoverAndSol");
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let response = photosJSON(data.photos)
        res.send(response);
    }).catch( () => {
        console.log("agrethsh");
    });
});

app.get('/rovers/:rover_name/sol/:sol/photos/html', (req, res)=> {
    let parameters: Param = {};
    parameters.name = req.params.rover_name;
    parameters.sol = req.params.sol;
    let api_url = requestConstructor(parameters, "RoverAndSol");
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let html = photosHTML(data.photos);
        res.send(html);
    }).catch(() => {
        console.log("agrethsh");
    });
});

app.get('/rovers/:rover_name/sol/:sol/camera/:camera/photos', (req,res)=>{
    let parameters: Param = {};
    parameters.name = req.params.rover_name;
    parameters.sol = req.params.sol;
    parameters.camera = req.params.camera;
    let api_url = requestConstructor(parameters, "RoverSolAndCamera");
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let response = photosJSON(data.photos)
        res.send(response);
    }).catch( () => {
        console.log("agrethsh");
    });
});

app.get('/rovers/:rover_name/sol/:sol/camera/:camera/photos/html', (req, res)=> {
    let parameters: Param = {};
    parameters.name = req.params.rover_name;
    parameters.sol = req.params.sol;
    parameters.camera = req.params.camera;
    let api_url = requestConstructor(parameters, "RoverSolAndCamera");
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let html = photosHTML(data.photos);
        res.send(html);
    }).catch(() => {
        console.log("agrethsh");
    });
});

app.get('/rovers/:rover_name/html', async (req, res) => {
    let parameters: Param = {};
    parameters.name = req.params.rover_name;
    let api_url = requestConstructor(parameters, "Rover");
    let resp = await axios.get(api_url);
    let data = resp.data;
    let html = roversHTML(data.rover);
    res.send(html);
});

app.get('/rovers/:rover_name', async (req, res) => {
    let parameters: Param = {};
    parameters.name = req.params.rover_name;
    let api_url = requestConstructor(parameters, "Rover");
    let resp = await axios.get(api_url);
    let data = resp.data;
    let response = roversJSON(data.rover);
    res.send(response);
});

