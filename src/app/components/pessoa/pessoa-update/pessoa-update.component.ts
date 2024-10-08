import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-update',
  templateUrl: './pessoa-update.component.html',
  styleUrls: ['./pessoa-update.component.css']
})
export class PessoaUpdateComponent implements OnInit {

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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  idEquipe: FormControl = new FormControl(null); // ID da equipe

  constructor(
    private service: PessoaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pessoa.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid 
  }

  findById(): void{
    this.service.findById(this.pessoa.id).subscribe(respota => {
      respota.perfis = [];
      this.pessoa = respota;
    })
  }

  update(): void {
    if (!this.validaCampos()) {
      this.toast.error('Por favor, preencha todos os campos corretamente.', 'Erro');
      return;
    }
    this.pessoa.idEquipe = this.idEquipe.value;

    this.service.update(this.pessoa).subscribe(() => {
      this.toast.success('Pessoa Atualizada com sucesso', 'Update');
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

  addPerfil(perfil: any): void{
    if(this.pessoa.perfis.includes(perfil)){
      this.pessoa.perfis.splice(this.pessoa.perfis.indexOf(perfil), 1);
    }else{
      this.pessoa.perfis.push(perfil);
    }
  }


}
