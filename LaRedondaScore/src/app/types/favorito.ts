import { Equipo } from "./equipo";

export interface Favorito {
    id: number;
    userId: number;
    equipos: { [key: number]: Equipo }; 
}
