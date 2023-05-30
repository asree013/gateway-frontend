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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductHomeComponent },
  { path: 'product/admin', component: ProductAdminComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'product/admin/detail/:id', component: ProductDetailComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'order/admin', component: OrderAdminComponent },
  { path: 'order/create', component: OrderCreateComponent },
  { path: 'order/edit', component: OrderEditComponent },
  { path: 'order/detail/:id', component: OrderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
