import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-delete',
  templateUrl: './pessoa-delete.component.html',
  styleUrls: ['./pessoa-delete.component.css']
})
export class PessoaDeleteComponent implements OnInit {

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
  };

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

  findById(): void {
    this.service.findById(this.pessoa.id).subscribe(respota => {
      respota.perfis = []; // Limpa os perfis, se necessário
      this.pessoa = respota;
    });
  }

  delete(): void {
    this.service.delete(this.pessoa.id).subscribe(() => {
      this.toast.success('Pessoa excluída com sucesso', 'Exclusão');
      this.router.navigate(['pessoas']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }
}
