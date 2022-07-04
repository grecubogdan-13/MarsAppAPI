import {JSONInterfacePhotosBySolRequest, RoversCamera, RoversInterfaceRequest} from "../../Models/Interfaces";

export function roversHTML(roverData: RoversInterfaceRequest) {
    let html = '';
    html = html + "Id: " + roverData.id.toString() + "<br/>" + "Name: " + roverData.name + "<br/>" + "Status: " +
        roverData.status + "<br/>" + "Maximum day: " + roverData.max_sol + "<br/>" + "Cameras: <br/>";
    roverData.cameras.forEach(function (d: RoversCamera) {
        html = html + "Short name: " + d.name + "<br/>" + "Full name:" + d.full_name + "<br/>"
    });
    html = html + "<br/>";
    return html;
}

export function photosHTML(photoArray: JSONInterfacePhotosBySolRequest[]) {
    let html = '';
    photoArray.forEach(function (d: JSONInterfacePhotosBySolRequest) {
        html = html + "Id: " + d.id + "<br/>" + "<img src ='" + d.img_src + "' /><br/><br/>"
    });
    return html;
}