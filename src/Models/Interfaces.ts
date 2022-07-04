export interface JSONInterfacePhotosBySolRequest {
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

export interface JSONInterfacePhotosBySolResponse {
    photo_id: number;
    rover_name: string;
    img_src: string;
    earth_date: string;
    camera_name: string;
}

export interface RoversCamera {
    name: string;
    full_name: string;
}

export interface RoversInterfaceRequest {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: RoversCamera[];
}

export interface RoversInterfaceResponse {
    id: number;
    name: string;
    status: string;
    max_sol: number;
    cameras: RoversCamera[];
}

export interface Param {
    name?: string;
    camera?: string;
    sol?: string;
}