import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { authGuard } from './gards/auth.guard';
import { PrestationComponent } from './components/prestation/prestation.component';
import { adminGuard } from './gards/admin.guard';
import { registerGuard } from './gards/register.guard';
import { AffectationComponent } from './components/affectation/affectation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:id', component: PrestationComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [registerGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  {
    path: 'assign',
    component: AffectationComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'category/new',
    component: CreateCategoryComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
