import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { CreateCategoryComponent } from './components/admin/create-section/create-category.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ServiceListComponent } from './components/list-services/service-list/service-list.component';
import { authGuard } from './gards/auth.guard';
import { PrestationComponent } from './components/prestation/prestation.component';
import { adminGuard } from './gards/admin.guard';
import { registerGuard } from './gards/register.guard';
import { AffectationComponent } from './components/admin/affectation/affectation.component';
import { AccountComponent } from './components/account-user/account/account.component';
import { AdminCrudComponent } from './components/admin/admin-crud/admin-crud.component';
import { BasketComponent } from './components/basket/basket.component';
import { guestAuthGuard } from './gards/guest-auth.guard';
import { ManagementEmployeeComponent } from './components/admin/management-employee/management-employee.component';

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
  { path: 'basket', component: BasketComponent, canActivate: [guestAuthGuard] },
  { path: 'account', component: AccountComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  {
    path: 'management_employee',
    component: ManagementEmployeeComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'crud-admin',
    component: AdminCrudComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
