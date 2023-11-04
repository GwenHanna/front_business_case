import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { authGuard } from './gards/auth.guard';
import { PrestationComponent } from './prestation/prestation.component';
import { adminGuard } from './gards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:id', component: PrestationComponent },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
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
