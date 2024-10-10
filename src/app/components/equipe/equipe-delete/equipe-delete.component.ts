import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipeService } from 'src/app/services/equipe.service';
import { Equipe } from 'src/app/models/equipe';

@Component({
  selector: 'app-equipe-delete',
  templateUrl: './equipe-delete.component.html',
  styleUrls: ['./equipe-delete.component.css']
})
export class EquipeDeleteComponent implements OnInit {

  equipe: Equipe = {
    id: null,
    nome: ''
  };

  constructor(
    private service: EquipeService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.equipe.id = Number(this.route.snapshot.paramMap.get('id')); // Pega o ID da URL e converte para número
    this.findById();
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

  delete(): void {
    this.service.delete(this.equipe.id).subscribe(() => {
      this.toast.success('Equipe deletada com sucesso', 'Delete');
      this.router.navigate(['equipes']);
    }, error => {
      this.toast.error('Erro ao deletar equipe', 'Erro');
    });
  }
}
