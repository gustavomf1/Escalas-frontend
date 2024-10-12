import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipeService } from 'src/app/services/equipe.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { EscalasService } from './../../../services/escalas.service';
import { Escala } from 'src/app/models/escala';
import { Equipe } from 'src/app/models/equipe';
import { Pessoa } from 'src/app/models/pessoa';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escala-create',
  templateUrl: './escala-create.component.html',
  styleUrls: ['./escala-create.component.css']
})
export class EscalaCreateComponent implements OnInit {

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllPessoas();
    this.findAllEquipe();
  }

  create(): void {
    const data = new Date(this.data.value);
    // Formatar data como yyyy-MM-dd
    const formattedDate = `${data.getFullYear()}-${('0' + (data.getMonth() + 1)).slice(-2)}-${('0' + data.getDate()).slice(-2)}`;
    this.escala.data = formattedDate; // Define a data formatada
    this.escala.pessoasExtrasIds = this.pessoasExtrasIds.value; // Define pessoasExtrasIds
    this.escalasService.create(this.escala).subscribe({
        next: (resposta) => {
            this.toastService.success('Escala criada com sucesso', 'Nova escala');
            this.router.navigate(['escalas']);
        },
        error: (ex) => {
            console.error('Erro ao criar escala:', ex); // Loga o erro completo para depuração
            const errorMessage = ex?.error?.error || 'Ocorreu um erro desconhecido'; // Lida com o caso de ex.error ser null
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
