import { Equipe } from "./equipe";
import { Pessoa } from "./pessoa";

export interface Escala{
    id: number;
    data: Date;
    equipe: Equipe;
    titulo: string;
    descricao: string;
    pessoasExtras?: Pessoa[];
}