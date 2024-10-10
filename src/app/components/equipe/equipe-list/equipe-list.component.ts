import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipe } from 'src/app/models/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css']
})
export class EquipeListComponent implements OnInit {

  ELEMENT_DATA: Equipe[] = [];

  dataSource = new MatTableDataSource<Equipe>([]);

  displayedColumns: string[] = ['id', 'nome', 'acoes'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: EquipeService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Equipe>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
