export interface User {
    id: string;
    firstName: string;
    phoneNumber: string;
    email: string;
    password: string;
    spaces: string[];
}

export interface UserForAuth {
    id: string;
    firstName: string;
    phoneNumber: string;
    email: string;
    password: string;
}