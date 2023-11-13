import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { SortServicesPipe } from './pipes/sort-services.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { CommentComponent } from './components/comment/comment.component';
import { PrestationComponent } from './components/prestation/prestation.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { BasketComponent } from './components/basket/basket.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
