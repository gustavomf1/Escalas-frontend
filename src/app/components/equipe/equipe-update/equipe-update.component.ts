import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipe } from 'src/app/models/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe-update',
  templateUrl: './equipe-update.component.html',
  styleUrls: ['./equipe-update.component.css']
})
export class EquipeUpdateComponent implements OnInit {

  equipe: Equipe = {
    id: null,
    nome: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: EquipeService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.equipe.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  validaCampos(): boolean {
    return this.nome.valid;
  }

  findById(): void {
    this.service.getEquipeById(this.equipe.id).subscribe(
      resposta => {
        this.equipe = resposta;
      },
      error => {
        this.toast.error('Erro ao buscar equipe', 'Erro');
      }
    );
  }

  update(): void {
    if (!this.validaCampos()) {
      this.toast.error('Por favor, preencha todos os campos corretamente.', 'Erro');
      return;
    }

    this.service.update(this.equipe).subscribe(() => {
      this.toast.success('Equipe deletada com sucesso', 'Delete');
      this.router.navigate(['equipes']);
    }, ex => {
      if (ex.error && ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else if (ex.error && ex.error.message) {
        this.toast.error(ex.error.message);
      } else {
        this.toast.error('Erro desconhecido ao atualizar a equipe', 'Erro');
      }
    });
  }
}
