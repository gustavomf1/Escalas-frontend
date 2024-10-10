import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Equipe } from './../../../models/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipe-create',
  templateUrl: './equipe-create.component.html',
  styleUrls: ['./equipe-create.component.css']
})
export class EquipeCreateComponent implements OnInit {

  equipe: Equipe = {
    id: null,
    nome: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: EquipeService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid 
  }

  create(): void {
    if (!this.validaCampos()) {
      this.toast.error('Por favor, preencha todos os campos corretamente.', 'Erro');
      return;
    }

    this.service.create(this.equipe).subscribe(() => {
      this.toast.success('Equipe cadastrada com sucesso', 'Cadastro');
      this.router.navigate(['equipes'])
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

}
