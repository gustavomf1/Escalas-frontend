import { Equipe } from "./equipe";
import { Pessoa } from "./pessoa";

export interface Escala{
    id?: number | string;
    data: Date;
    equipe: any;
    nomeEquipe: string;
    titulo: string;
    descricao: string;
    pessoasExtras?: Pessoa[];
    nomePessoaExtras?: string;
}