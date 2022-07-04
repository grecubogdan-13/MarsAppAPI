import {
    JSONInterfacePhotosBySolRequest,
    JSONInterfacePhotosBySolResponse, RoversCamera,
    RoversInterfaceRequest,
    RoversInterfaceResponse
} from "./Interfaces";

export function photosJSON(photoArray: JSONInterfacePhotosBySolRequest[]) {
    //let response = '{ "photos":[';
    let response = "";
    photoArray.forEach(function (d: JSONInterfacePhotosBySolRequest) {
        let selectData: JSONInterfacePhotosBySolResponse = new class implements JSONInterfacePhotosBySolResponse {
            camera_name: string = d.camera.full_name;
            earth_date: string = d.earth_date;
            img_src: string = d.img_src;
            photo_id: number = d.id;
            rover_name: string = d.rover.name;
        };
        response = response + JSON.stringify(selectData, null, 4);
    });
    //response = response + ']}'
    return response;
}

export function roversJSON(roverData: RoversInterfaceRequest) {
    let response = '{ rover: ';
    let selectData: RoversInterfaceResponse = new class implements RoversInterfaceResponse {
        id: number = roverData.id;
        name: string = roverData.name;
        status: string = roverData.status;
        max_sol: number = roverData.max_sol;
        cameras: Array<RoversCamera> = roverData.cameras;
    };
    response = response + JSON.stringify(selectData, null, 4);
    response = response + "}";
    return response;
}