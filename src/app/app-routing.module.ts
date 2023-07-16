import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authen/login/login.component';
import { RegisterComponent } from './components/authen/register/register.component';
import { ProductHomeComponent } from './components/products/product-home/product-home.component';
import { ProductAdminComponent } from './admin/product/product-admin/product-admin.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { ProductCreateComponent } from './admin/product/product-create/product-create.component';
import { MenuComponent } from './admin/menu/menu.component';
import { OrderAdminComponent } from './admin/order/order-admin/order-admin.component';
import { OrderCreateComponent } from './admin/order/order-create/order-create.component';
import { OrderEditComponent } from './admin/order/order-edit/order-edit.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { ProductDetailComponent } from './admin/product/product-detail/product-detail.component';
import { ActiveRouteService } from './services/active-route.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent , canActivate: [ActiveRouteService] },
  { path: 'shops', component: ProductHomeComponent , canActivate: [ActiveRouteService]},
  { path: 'product/admin', component: ProductAdminComponent, canActivate: [ActiveRouteService] },
  { path: 'product/create', component: ProductCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'product/edit/:id', component: ProductEditComponent, canActivate: [ActiveRouteService] },
  { path: 'product/admin/detail/:id', component: ProductDetailComponent, canActivate: [ActiveRouteService] },
  { path: 'menu', component: MenuComponent, canActivate: [ActiveRouteService] },
  { path: 'order/admin', component: OrderAdminComponent , canActivate: [ActiveRouteService] },
  { path: 'order/create', component: OrderCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'order/edit', component: OrderEditComponent, canActivate: [ActiveRouteService] },
  { path: 'order/detail/:id', component: OrderDetailComponent, canActivate: [ActiveRouteService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ActiveRouteService]
})
export class AppRoutingModule {}
