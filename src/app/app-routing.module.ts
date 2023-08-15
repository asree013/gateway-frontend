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
import { AccoutAdminComponent } from './admin/accouts/accout-admin/accout-admin.component';
import { AccoutCreateComponent } from './admin/accouts/accout-create/accout-create.component';
import { AccoutEditComponent } from './admin/accouts/accout-edit/accout-edit.component';
import { AccoutHistoryComponent } from './admin/accouts/accout-history/accout-history.component';
import { AccoutHomeComponent } from './admin/accouts/accout-home/accout-home.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockCreateByidComponent } from './components/stock/stock-create-byid/stock-create-byid.component';
import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { StockAdminComponent } from './components/stock/stock-admin/stock-admin.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';
import { StoreCreteComponent } from './components/store/store-crete/store-crete.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shops', component: ProductHomeComponent , canActivate: [ActiveRouteService]},
  { path: 'product/admin', component: ProductAdminComponent, canActivate: [ActiveRouteService] },
  { path: 'product/create', component: ProductCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'product/edit/:id', component: ProductEditComponent, canActivate: [ActiveRouteService] },
  { path: 'product/admin/detail/:id', component: ProductDetailComponent, canActivate: [ActiveRouteService] },
  { path: 'menu', component: MenuComponent, canActivate: [ActiveRouteService] },
  { path: 'order/admin', component: OrderAdminComponent , canActivate: [ActiveRouteService] },
  { path: 'order/create', component: OrderCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'order/edit', component: OrderEditComponent, canActivate: [ActiveRouteService] },
  { path: 'order/detail/:id', component: OrderDetailComponent, canActivate: [ActiveRouteService] },
  { path: 'accout/home', component: AccoutHomeComponent, canActivate: [ActiveRouteService] },
  { path: 'accout/admin', component: AccoutAdminComponent, canActivate: [ActiveRouteService] },
  { path: 'accout/create', component: AccoutCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'accout/edit/:id', component: AccoutEditComponent, canActivate: [ActiveRouteService] },
  { path: 'accout/history', component: AccoutHistoryComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/create', component: StockCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/homne', component: StockHomeComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/admin', component: StockAdminComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/create/:id', component: StockCreateByidComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/edit/:id', component: StockEditComponent, canActivate: [ActiveRouteService] },
  { path: 'store/create', component: StoreCreteComponent, canActivate: [ActiveRouteService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ActiveRouteService]
})
export class AppRoutingModule {}
