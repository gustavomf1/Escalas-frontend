import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { PessoaCreateComponent } from './components/pessoa/pessoa-create/pessoa-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { PessoaUpdateComponent } from './components/pessoa/pessoa-update/pessoa-update.component';
import { PessoaDeleteComponent } from './components/pessoa/pessoa-delete/pessoa-delete.component';
import { EquipeListComponent } from './components/equipe/equipe-list/equipe-list.component';
import { EquipeCreateComponent } from './components/equipe/equipe-create/equipe-create.component';
import { EquipeUpdateComponent } from './components/equipe/equipe-update/equipe-update.component';
import { EquipeDeleteComponent } from './components/equipe/equipe-delete/equipe-delete.component';
import { EscalaListComponent } from './components/escala/escala-list/escala-list.component';
import { EscalaCreateComponent } from './components/escala/escala-create/escala-create.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common'; // Importando para registrar a locale
import localePt from '@angular/common/locales/pt'; // Importando locale pt-BR
import { LOCALE_ID } from '@angular/core';
import { EscalaUpdateComponent } from './components/escala/escala-update/escala-update.component'; // Importando LOCALE_ID para configuração

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    PessoaListComponent,
    LoginComponent,
    PessoaCreateComponent,
    PessoaUpdateComponent,
    PessoaDeleteComponent,
    EquipeListComponent,
    EquipeCreateComponent,
    EquipeUpdateComponent,
    EquipeDeleteComponent,
    EscalaListComponent,
    EscalaCreateComponent,
    EscalaUpdateComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Configurando a locale para pt-BR
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localePt); // Registrando a locale
  }
}
