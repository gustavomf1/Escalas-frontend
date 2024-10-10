import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Escala } from 'src/app/models/escala';
import { EscalasService } from 'src/app/services/escalas.service';

@Component({
  selector: 'app-escala-list',
  templateUrl: './escala-list.component.html',
  styleUrls: ['./escala-list.component.css']
})
export class EscalaListComponent implements OnInit {

  ELEMENT_DATA: Escala[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'equipe', 'data', 'pessoasExtras', 'acoes'];
  dataSource = new MatTableDataSource<Escala>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: EscalasService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource.data = this.ELEMENT_DATA;  
      this.dataSource.paginator = this.paginator; 
    }, err => {
      console.error('Erro ao buscar escalas:', err);
    });
  }

}
