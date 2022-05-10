import { CustomerDTO } from "./CustomerDTO";
import { RaffleDTO } from "./RaffleDTO";

export interface OrderDTO {
    id?: number;
    raffle?: RaffleDTO[];
    customer?: CustomerDTO;
    customerId: number;
    raffleId: number;
    number: number;
    code: string;
    situation: string;
    status: number;
}