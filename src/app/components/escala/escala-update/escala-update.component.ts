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
  selector: 'app-escala-update',
  templateUrl: './escala-update.component.html',
  styleUrls: ['./escala-update.component.css']
})
export class EscalaUpdateComponent implements OnInit {

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

  data: FormControl = new FormControl(null, [Validators.required]);
  equipe: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  descricao: FormControl = new FormControl(null, [Validators.required]);
  pessoasExtrasIds: FormControl = new FormControl([]);

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

  update(): void {
    const data = new Date(this.data.value);
    const formattedDate = `${data.getFullYear()}-${('0' + (data.getMonth() + 1)).slice(-2)}-${('0' + data.getDate()).slice(-2)}`;
    this.escala.data = formattedDate; 
    this.escala.pessoasExtrasIds = this.pessoasExtrasIds.value; 
    this.escalasService.update(this.escala).subscribe({
        next: (resposta) => {
            this.toastService.success('Escala atualizada com sucesso', 'Atualizar escala');
            this.router.navigate(['escalas']);
        },
        error: (ex) => {
            console.error('Erro ao criar escala:', ex); 
            const errorMessage = ex?.error?.error || 'Ocorreu um erro desconhecido'; 
            this.toastService.error(errorMessage);
        }
    });
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

  validaCampos(): boolean {
    return this.data.valid && this.equipe.valid && this.descricao.valid
      && this.titulo.valid && this.pessoasExtrasIds.valid;
  }
}
