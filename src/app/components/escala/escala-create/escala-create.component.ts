import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-escala-create',
  templateUrl: './escala-create.component.html',
  styleUrls: ['./escala-create.component.css']
})
export class EscalaCreateComponent implements OnInit {
  escalaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializando o formulário com FormBuilder
    this.escalaForm = this.fb.group({
      titulo: ['', Validators.required],
      data: [null, Validators.required] // Campo de data com validação
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.escalaForm.valid) {
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
      console.log('Formulário enviado:', this.escalaForm.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}
