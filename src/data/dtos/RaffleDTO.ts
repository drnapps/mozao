import { UserDTO } from "./UserDTO";

export interface RaffleDTO {
    id?: number;
    name?: string;
    datetime?: string;
    price?: number;
    quantity?: number;
    path?: string;
    situation?: string;
    user?: UserDTO[];
    userId?: number;
    status?: number;
}