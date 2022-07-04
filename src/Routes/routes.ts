import express from "express";
import {
    HTMLNameAndSol,
    HTMLNameSolAndCamera,
    HTMLRover,
    JSONNameAndSol,
    JSONNameSolAndCamera, JSONRover, test
} from "../Controllers/controller";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', test);
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

app.get('/rovers/:rover_name/sol/:sol/photos', JSONNameAndSol);

app.get('/rovers/:rover_name/sol/:sol/photos/html', HTMLNameAndSol);

app.get('/rovers/:rover_name/sol/:sol/camera/:camera/photos', JSONNameSolAndCamera);

app.get('/rovers/:rover_name/sol/:sol/camera/:camera/photos/html', HTMLNameSolAndCamera);

app.get('/rovers/:rover_name/html', HTMLRover);

app.get('/rovers/:rover_name', JSONRover);
