import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlowersComponent } from './flowers/flowers.component';
import { AuthInterceptor } from '../app/_services/auth-interceptor';
import { CreateFlowerComponent } from './flowers/create-flower/create-flower.component';

import { CollectionComponent } from './flowers/collection/collection.component';
import { PDPageComponent } from './flowers/pdpage/pdpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartComponent } from './cart/cart.component';
import { CartitemComponent } from './cart/cartitem/cartitem.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FlowersComponent,
    CreateFlowerComponent,
    CollectionComponent,
    PDPageComponent,
    PageNotFoundComponent,
    CartComponent,
    CartitemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  // providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
