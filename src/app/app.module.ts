import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './components/admin/create-category/create-category.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminComponent } from './pages/admin/admin.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { SortServicesPipe } from './pipes/sort-services.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { CommentComponent } from './components/comment/comment.component';
import { PrestationComponent } from './components/prestation/prestation.component';
import { AffectationComponent } from './components/admin/affectation/affectation.component';
import { BasketComponent } from './components/basket/basket.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketDialogueComponent } from './components/basket-dialogue/basket-dialogue.component';
import { BasketService } from './services/basket.service';
import { HeaderComponent } from './components/header/header.component';
import { PressingComponent } from './pages/pressing/pressing.component';
import { AccountComponent } from './components/account-user/account/account.component';
import { UpDateAccountComponent } from './components/account-user/up-date-account/up-date-account.component';
import { AdminCrudComponent } from './components/admin/admin-crud/admin-crud.component';
import { CreateArticleComponent } from './components/admin/create-article/create-article.component';
import { CreateServiceComponent } from './components/admin/create-service/create-service.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DynamicDialogModule,
    ButtonModule,
  ],
  providers: [AuthInterceptor, DialogService, BasketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
