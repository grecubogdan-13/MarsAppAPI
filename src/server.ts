import express from "express";
import axios from 'axios';

const app = express();
const port = 8000;
const api_key = "TxbNgclp1JXLSnghP5ecigSdEUvdMNcabY3p1lno";
const base_api = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

interface JSONInterfacePhotosBySolRequest {
    id: number;
    sol: number;
    camera: {
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
    };
   img_src: string;
   earth_date: string;
   rover: {
       id: number;
       name: string;
       landing_date: string;
       launch_date: string;
       status: string;
   }
}

interface JSONInterfacePhotosBySolResponse {
    photo_id: number;
    rover_name: string;
    img_src: string;
    earth_date: string;
    camera_name: string;
}

interface RoversCamera {
    name: string;
    full_name: string;
}

interface RoversInterfaceRequest {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras:  RoversCamera[];
}

interface RoversInterfaceResponse {
    id: number;
    name: string;
    status: string;
    max_sol: number;
    cameras:  RoversCamera[];
}

interface Param {
    name?: string;
    camera?: string;
    sol?: string;
}

function requestConstructor (parameters: Param, type: string) {
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

function photosHTML (photoArray: JSONInterfacePhotosBySolRequest[]) {
    let html = '';
    photoArray.forEach(function (d: JSONInterfacePhotosBySolRequest) {
        html = html + "Id: " + d.id + "<br/>" + "<img src ='" + d.img_src + "' /><br/><br/>"
    });
    return html;
}

function roversHTML (roverData: RoversInterfaceRequest) {
    let html = '';
    html = html + "Id: " + roverData.id.toString() + "<br/>" + "Name: " + roverData.name + "<br/>" + "Status: " +
        roverData.status + "<br/>" + "Maximum day: " + roverData.max_sol + "<br/>" + "Cameras: <br/>";
    roverData.cameras.forEach(function (d: RoversCamera) {
        html = html + "Short name: " + d.name + "<br/>" + "Full name:" + d.full_name + "<br/>"
    });
    html = html + "<br/>";
    return html;
}

function photosJSON(photoArray: JSONInterfacePhotosBySolRequest[]) {
    let response = '{ "photos":[';
    photoArray.forEach(function (d: JSONInterfacePhotosBySolRequest){
        let selectData:  JSONInterfacePhotosBySolResponse = new class implements JSONInterfacePhotosBySolResponse {
            camera_name: string = "";
            earth_date: string = "";
            img_src: string = "";
            photo_id: number = 0;
            rover_name: string = "";
        };
        selectData.photo_id = d.id;
        selectData.rover_name = d.rover.name;
        selectData.img_src = d.img_src;
        selectData.earth_date = d.earth_date;
        selectData.camera_name = d.camera.full_name;
        response = response + JSON.stringify(selectData, null, 4);
    });
    response = response +']}'
    return response;
}

function roversJSON(roverData: RoversInterfaceRequest) {
    let response = '{ rover: ';
    let selectData:  RoversInterfaceResponse = new class implements RoversInterfaceResponse {
        id: number = 0;
        name: string = "";
        status: string = "";
        max_sol: number = 0;
        cameras:  Array<RoversCamera> = [];
    };
    selectData.id = roverData.id;
    selectData.name = roverData.name;
    selectData.status = roverData.status;
    selectData.max_sol = roverData.max_sol;
    selectData.cameras = roverData.cameras;
    response = response + JSON.stringify(selectData, null, 4);
    response = response + "}";
    return response;
}

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

