import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./components/home/home.component";
import { PessoaListComponent } from "./components/pessoa/pessoa-list/pessoa-list.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { PessoaCreateComponent } from "./components/pessoa/pessoa-create/pessoa-create.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    {
        path: '', component: NavComponent, canActivate: [AuthGuard], children: [
            {path: 'home', component: HomeComponent},

            {path: 'pessoas', component: PessoaListComponent},
            {path: 'pessoas/create', component: PessoaCreateComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }