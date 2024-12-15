export interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    spaces: string[];
}

export interface UserForAuth {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
}