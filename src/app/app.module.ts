import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/navigation/nav-bar/nav-bar.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './components/admin/create-section/create-category.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ServiceListComponent } from './components/list-services/service-list/service-list.component';
import { SortServicesPipe } from './pipes/sort-services.pipe';
import { FooterComponent } from './components/footer/footer_desktop/footer.component';
import { CommentComponent } from './components/comment/comment.component';
import { PrestationComponent } from './components/prestation/prestation.component';
import { AffectationComponent } from './components/admin/affectation/affectation.component';
import { BasketComponent } from './components/basket/basket.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { BasketDialogueComponent } from './components/basket-dialogue/basket-dialogue.component';
import { BasketService } from './services/basket.service';
import { HeaderComponent } from './components/header/header.component';
import { PressingComponent } from './components/pressing/pressing.component';
import { AccountComponent } from './components/account-user/account/account.component';
import { UpDateAccountComponent } from './components/account-user/up-date-account/up-date-account.component';
import { AdminCrudComponent } from './components/admin/admin-crud/admin-crud.component';
import { CreateArticleComponent } from './components/admin/create-service-article/create-article.component';
import { CreateServiceComponent } from './components/admin/create-service/create-service.component';
import { NoteDialogueComponent } from './components/note-dialogue/note-dialogue.component';
import { ErrorsInterceptor } from './interceptor/errors.interceptor';
import { DialogModule } from 'primeng/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { FooterMobileComponent } from './components/footer/footer_mobile/footer-mobile.component';
import { NavBarMobileComponent } from './components/navigation/nav-bar-mobile/nav-bar-mobile.component';
import { ServiceListMobileComponent } from './components/list-services/service-list-mobile/service-list-mobile.component';
import { BorderAnimateDirective } from './directives/border-animate.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { ManagementEmployeeComponent } from './components/admin/management-employee/management-employee.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { StoreModuleModule } from './store/store-module/store-module.module';
import { EmployeeFilterPipe } from './pipes/employee-filter.pipe';
import { ConfirmRemoveDialogComponent } from './components/modal/confirm-remove-dialog/confirm-remove-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { StoreModule } from '@ngrx/store';
// import { appReducer } from './store/app.reducer';
// import { metaReducer } from './store/reducers/service-types.reducer';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ArticleComponent,
    LoginComponent,
    CreateCategoryComponent,
    RegisterComponent,
    AdminComponent,
    ServiceListComponent,
    SortServicesPipe,
    FooterComponent,
    FooterMobileComponent,
    CommentComponent,
    PrestationComponent,
    AffectationComponent,
    BasketComponent,
    BasketDialogueComponent,
    HeaderComponent,
    PressingComponent,
    AccountComponent,
    UpDateAccountComponent,
    AdminCrudComponent,
    CreateArticleComponent,
    CreateServiceComponent,
    NoteDialogueComponent,
    NavBarMobileComponent,
    ServiceListMobileComponent,
    BorderAnimateDirective,
    ManagementEmployeeComponent,
    UsersListComponent,
    EmployeeFilterPipe,
    ConfirmRemoveDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DynamicDialogModule,
    ButtonModule,
    DialogModule,
    MatSliderModule,
    MatDialogModule,
    PaginatorModule,
    StoreModuleModule,
    ConfirmDialogModule,
  ],
  providers: [
    AuthInterceptor,
    DialogService,
    BasketService,
    ConfirmationService,
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
