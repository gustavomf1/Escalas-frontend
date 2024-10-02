import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pessoa } from 'src/app/models/pessoa';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit, AfterViewInit {

  // Propriedade da classe, sem 'const'
  ELEMENT_DATA: Pessoa[] = [
    {
      id: 1,
      nome: 'Gustavo Martins',
      cpf: '123.456.789-10',
      email: 'gustavo@gmail.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '20/10/2024'
    }
  ];

  // Colunas exibidas na tabela
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  
  // DataSource da tabela com os dados
  dataSource = new MatTableDataSource<Pessoa>(this.ELEMENT_DATA);

  // ViewChild para pegar o paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  // Configurando o paginator após a inicialização da view
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
