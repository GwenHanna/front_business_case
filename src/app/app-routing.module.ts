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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'category/new', component: CreateCategoryComponent },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
