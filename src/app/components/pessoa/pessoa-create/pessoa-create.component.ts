import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipe } from 'src/app/models/equipe';
import { Pessoa } from 'src/app/models/pessoa';
import { EquipeService } from 'src/app/services/equipe.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-create',
  templateUrl: './pessoa-create.component.html',
  styleUrls: ['./pessoa-create.component.css']
})
export class PessoaCreateComponent implements OnInit {

  pessoa: Pessoa = {
    id: null,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
    idEquipe: null, // Alterado para idEquipe
    escalasExtras: null
  }

  equipes: Equipe[] = [];

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  idEquipe: FormControl = new FormControl(null); // ID da equipe

  constructor(
    private service: PessoaService,
    private equipeService: EquipeService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllEquipe();
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid 
  }

  create(): void {
    // Verifica se todos os campos são válidos antes de fazer a requisição
    if (!this.validaCampos()) {
      this.toast.error('Por favor, preencha todos os campos corretamente.', 'Erro');
      return;
    }
    this.pessoa.idEquipe = this.idEquipe.value; 

    this.service.create(this.pessoa).subscribe(() => {
      this.toast.success('Pessoa cadastrada com sucesso', 'Cadastro');
      this.router.navigate(['pessoas'])
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message);
      }
    });
  }

  findAllEquipe(): void {
    this.equipeService.findAll().subscribe(resposta => {
      this.equipes = resposta;
    });
  }

  addPerfil(perfil: any): void{
    if(this.pessoa.perfis.includes(perfil)){
      this.pessoa.perfis.splice(this.pessoa.perfis.indexOf(perfil), 1);
    }else{
      this.pessoa.perfis.push(perfil);
    }
  }

}
