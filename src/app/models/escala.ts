import { Equipe } from "./equipe";
import { Pessoa } from "./pessoa";

export interface Escala{
    id?: number | string;
    data: string;
    equipe: any;
    nomeEquipe: string;
    titulo: string;
    descricao: string;
    pessoasExtrasIds?: Pessoa[];
    nomePessoaExtras?: string;
}