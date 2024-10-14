import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { PessoaListComponent } from "./components/pessoa/pessoa-list/pessoa-list.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { PessoaCreateComponent } from "./components/pessoa/pessoa-create/pessoa-create.component";
import { PessoaUpdateComponent } from "./components/pessoa/pessoa-update/pessoa-update.component";
import { PessoaDeleteComponent } from "./components/pessoa/pessoa-delete/pessoa-delete.component";
import { EquipeListComponent } from "./components/equipe/equipe-list/equipe-list.component";
import { EquipeCreateComponent } from "./components/equipe/equipe-create/equipe-create.component";
import { EquipeUpdateComponent } from "./components/equipe/equipe-update/equipe-update.component";
import { EquipeDeleteComponent } from "./components/equipe/equipe-delete/equipe-delete.component";
import { EscalaListComponent } from "./components/escala/escala-list/escala-list.component";
import { EscalaCreateComponent } from "./components/escala/escala-create/escala-create.component";
import { EscalaUpdateComponent } from "./components/escala/escala-update/escala-update.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    {
        path: '', component: NavComponent, canActivate: [AuthGuard], children: [
            {path: 'home', component: HomeComponent},

            {path: 'pessoas', component: PessoaListComponent},
            {path: 'pessoas/create', component: PessoaCreateComponent},
            {path: 'pessoas/update/:id', component: PessoaUpdateComponent},
            {path: 'pessoas/delete/:id', component: PessoaDeleteComponent},

            {path: 'equipes', component: EquipeListComponent},
            {path: 'equipes/create', component: EquipeCreateComponent},
            {path: 'equipes/update/:id', component: EquipeUpdateComponent},
            {path: 'equipes/delete/:id', component: EquipeDeleteComponent},

            {path: 'escalas', component: EscalaListComponent},
            {path: 'escalas/create', component: EscalaCreateComponent},
            {path: 'escalas/update/:id', component: EscalaUpdateComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }