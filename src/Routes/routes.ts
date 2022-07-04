import express from "express";
import axios from 'axios';
import {photosHTML, roversHTML} from "../Services/Responses/HTMLResponseFunctions";
import {photosJSON, roversJSON} from "../Services/Responses/JSONResponseFunctions";
import {requestConstructor} from "../Services/Requests/requests";
import {HTMLNameAndSol, JSONNameAndSol} from "../Controllers/controller";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

app.get('/rovers/:rover_name/sol/:sol/photos', JSONNameAndSol);

app.get('/rovers/:rover_name/sol/:sol/photos/html',HTMLNameAndSol);

app.get('/rovers/:rover_name/sol/:sol/camera/:camera/photos', );

app.get('/rovers/:rover_name/sol/:sol/camera/:camera/photos/html', HTMLNameAndSol);

app.get('/rovers/:rover_name/html', async (req, res) => {
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
});

app.get('/rovers/:rover_name', async (req, res) => {
    let parameters = {
        name: req.params.rover_name
    }
    let api_url = requestConstructor(parameters, "Rover");
    if (api_url) {
        let resp = await axios.get(api_url);
        let data = resp.data;
        let response = roversJSON(data.rover);
        res.send(response);
    } else {
        res.send("Bad request");
    }
});
