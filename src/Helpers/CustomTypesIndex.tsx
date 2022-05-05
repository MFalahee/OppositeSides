export interface ButtonProps  {
    onClick?: (event: React.MouseEvent) => void,
    visible: boolean, //is the button rendered?
}

export interface WrapperProps {
    api: string;
    weather: string;
}


export interface MapControlProps {
    position: google.maps.ControlPosition;
    map: google.maps.Map;
}
export const posObj = {
    TOP_LEFT: google.maps.ControlPosition,
    TOP_CENTER: google.maps.ControlPosition,
    TOP_RIGHT: google.maps.ControlPosition,
    LEFT_TOP: google.maps.ControlPosition,
    LEFT_CENTER: google.maps.ControlPosition,
    LEFT_BOTTOM: google.maps.ControlPosition,
    RIGHT_TOP: google.maps.ControlPosition,
    RIGHT_CENTER: google.maps.ControlPosition,
    RIGHT_BOTTOM: google.maps.ControlPosition,
    BOTTOM_LEFT: google.maps.ControlPosition,
    BOTTOM_CENTER: google.maps.ControlPosition,
    BOTTOM_RIGHT: google.maps.ControlPosition,
}

