export interface ButtonProps  {
    onClick?: (event: React.MouseEvent) => void,
    visible: boolean, //is the button rendered?
}

export interface WrapperProps {
    api: string;
    weather: string;
}


