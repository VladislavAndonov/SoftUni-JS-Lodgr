import { Owner } from "./owner";

export interface Space {
    id: string;
    name: string;
    location: string;
    price: number;
    images: string[];
    description: string;
   
}

    // owner: Owner;