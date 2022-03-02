import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './flowers/collection/collection.component';
import { CreateFlowerComponent } from './flowers/create-flower/create-flower.component';
import { FlowersComponent } from './flowers/flowers.component';
import { PDPageComponent } from './flowers/pdpage/pdpage.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_services/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'createFlower', component: CreateFlowerComponent },
  {
    path: 'createFlower',
    component: CreateFlowerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'flowers', component: FlowersComponent },
  { path: 'collections', component: CollectionComponent },
  { path: 'collections/flower', component: PDPageComponent },
  { path: 'cart', component: CartComponent },

  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
