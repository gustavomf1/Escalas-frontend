import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipe } from 'src/app/models/equipe';
import { Escala } from 'src/app/models/escala';
import { Pessoa } from 'src/app/models/pessoa';
import { EquipeService } from 'src/app/services/equipe.service';
import { EscalasService } from 'src/app/services/escalas.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-escala-read',
  templateUrl: './escala-read.component.html',
  styleUrls: ['./escala-read.component.css']
})
export class EscalaReadComponent implements OnInit {

  escala: Escala = {
    data: '',
    equipe: '',
    nomeEquipe: '',
    titulo: '',
    descricao: '',
    pessoasExtrasIds: []
  }

  equipes: Equipe[] = [];
  pessoas: Pessoa[] = [];

  constructor(
    private equipeService: EquipeService,
    private pessoaService: PessoaService,
    private escalasService: EscalasService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.escala.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllPessoas();
    this.findAllEquipe();
  }

  findById(): void{
    this.escalasService.findById(this.escala.id).subscribe(resposta => {
      this.escala = resposta
    }, ex => {
      this.toastService.error(ex.console.error);
    })
  }

  findAllPessoas(): void {
    this.pessoaService.findAll().subscribe(resposta => {
      this.pessoas = resposta;
    });
  }

  findAllEquipe(): void {
    this.equipeService.findAll().subscribe(resposta => {
      this.equipes = resposta;
    });
  }

}
