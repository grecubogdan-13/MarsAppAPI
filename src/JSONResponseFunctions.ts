import {
    JSONInterfacePhotosBySolRequest,
    JSONInterfacePhotosBySolResponse, RoversCamera,
    RoversInterfaceRequest,
    RoversInterfaceResponse
} from "./Interfaces";


export function photosJSON(photoArray: JSONInterfacePhotosBySolRequest[]) {
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

export function roversJSON(roverData: RoversInterfaceRequest) {
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