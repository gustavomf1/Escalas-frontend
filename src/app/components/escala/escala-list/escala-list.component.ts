import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Escala } from 'src/app/models/escala';
import { EscalasService } from 'src/app/services/escalas.service';
import { MatDialog } from '@angular/material/dialog'; // Import para o diálogo de confirmação
import { MatSnackBar } from '@angular/material/snack-bar'; // Para exibir mensagens de sucesso/erro
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

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
    private service: EscalasService,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar 
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

  openDeleteDialog(escala: Escala): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `Tem certeza que deseja deletar a escala ${escala.titulo}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEscala(escala); 
      }
    });
  }

  deleteEscala(escala: Escala): void {
    this.service.delete(escala.id).subscribe({
      next: () => {
        this.snackBar.open('Escala deletada com sucesso', 'Fechar', { duration: 3000 });
        this.findAll();
      },
      error: (err) => {
        console.error('Erro ao deletar escala:', err);
        this.snackBar.open('Erro ao deletar escala', 'Fechar', { duration: 3000 });
      }
    });
  }

}
