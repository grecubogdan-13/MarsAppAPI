import express from "express";
import axios from 'axios';

const app = express();
const port = 8000;
let api_key = "TxbNgclp1JXLSnghP5ecigSdEUvdMNcabY3p1lno";

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

interface RoversInterfaceRequest {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: {
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
    }[];
}

app.get('/rovers/curiosity/sol', (req,res)=>{
    let api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${api_key}`
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let response = '{ "photos":[';
        console.log(data.photos);
        data.photos.forEach(function (d: JSONInterfacePhotosBySolRequest){
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
            response = response + "{" + JSON.stringify(selectData, null, 4);
        });
        response = response +']}'
        res.send(response);
    }).catch( () => {
        console.log("agrethsh");
    });
});

app.get('/rovers', (req, res)=>{
    let api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${api_key}`
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let html = '';
        console.log(data.photos);
        data.photos.forEach(function (d: JSONInterfacePhotosBySolRequest){
            html = html + "Id: " + d.id + "<br/>" + "<img src ='" + d.img_src + "' /><br/><br/>"
        });
        res.send(html);
    }).catch( () => {
        console.log("agrethsh");
    });
});

app.get('/rovers', (req, res)=>{
    let api_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${api_key}`
    axios.get(api_url).then(resp => {
        let data = resp.data;
        let html = '';
        console.log(data.photos);
        data.photos.forEach(function (d: JSONInterfacePhotosBySolRequest){
            html = html + "Id: " + d.id + "<br/>" + "<img src ='" + d.img_src + "' /><br/><br/>"
        });
        res.send(html);
    }).catch( () => {
        console.log("agrethsh");
    });
});