import { OrderDTO } from "./OrderDTO";
import { UserDTO } from "./UserDTO";

export interface CustomerDTO {
    id?: number;
    name?: string;
    telefone?: string;
    status?: number;
    user?: UserDTO[];
    userId?: number;
    orders?: OrderDTO[];
    email?: string;
    password?: string;
}