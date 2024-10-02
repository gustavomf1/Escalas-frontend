export interface Pessoa {
    id?: number | string; // Defina o tipo como número ou string, se aplicável
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: string[]; // Tipagem correta para uma lista de strings
    dataCriacao: string | Date; // Pode ser string (ex: '20/10/2024') ou objeto Date
  }
  