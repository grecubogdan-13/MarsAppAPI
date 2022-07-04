import {
    JSONInterfacePhotosBySolRequest,
    JSONInterfacePhotosBySolResponse, JSONInterfacePhotosList, RoversCamera,
    RoversInterfaceRequest,
    RoversInterfaceResponse
} from "../../Models/Interfaces";

export function photosJSON(photoArray: JSONInterfacePhotosBySolRequest[]) {
    let response = new class implements JSONInterfacePhotosList {
        photos: Array<JSONInterfacePhotosBySolResponse> = [];
    };
    photoArray.forEach(function (d: JSONInterfacePhotosBySolRequest) {
        let selectData: JSONInterfacePhotosBySolResponse = new class implements JSONInterfacePhotosBySolResponse {
            camera_name: string = d.camera.full_name;
            earth_date: string = d.earth_date;
            img_src: string = d.img_src;
            photo_id: number = d.id;
            rover_name: string = d.rover.name;
        };
        response.photos.push(selectData);
    });
    return JSON.stringify(response, null, 4);
}

export function roversJSON(roverData: RoversInterfaceRequest) {
    let selectData: RoversInterfaceResponse = new class implements RoversInterfaceResponse {
        id: number = roverData.id;
        name: string = roverData.name;
        status: string = roverData.status;
        max_sol: number = roverData.max_sol;
        cameras: Array<RoversCamera> = roverData.cameras;
    };
    let response = JSON.stringify(selectData, null, 4);
    return response;
}