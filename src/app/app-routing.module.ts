import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './admin/menu/menu.component';
import { ActiveRouteService } from './services/active-route.service';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockCreateByidComponent } from './components/stock/stock-create-byid/stock-create-byid.component';
import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { StockAdminComponent } from './components/stock/stock-admin/stock-admin.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'authen/login', pathMatch: 'full' },
  { path: 'authen', loadChildren: () => import('./modules/authen/authen.module').then(m => m.AuthenModule)},
  { path: 'product', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) , canActivate: [ActiveRouteService]},
  { path: 'menu', component: MenuComponent, canActivate: [ActiveRouteService] },
  { path: 'order', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) , canActivate: [ActiveRouteService] },
  { path: 'accout', loadChildren: () => import('./modules/accout/accout.module').then(m => m.AccoutModule), canActivate: [ActiveRouteService] },
  { path: 'stock', loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule), canActivate: [ActiveRouteService]},
  { path: 'packing', loadChildren: () => import('./modules/packing-case/packing-case.module').then(m => m.PackingCaseModule), canActivate: [ActiveRouteService]},
  { path: 'stock/create', component: StockCreateComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/homne', component: StockHomeComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/create/:id', component: StockCreateByidComponent, canActivate: [ActiveRouteService] },
  { path: 'stock/edit/:id', component: StockEditComponent, canActivate: [ActiveRouteService] },
  { path: 'store', loadChildren: () => import('./modules/branch/branch.module').then(m => m.BranchModule), canActivate: [ActiveRouteService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ActiveRouteService]
})
export class AppRoutingModule {}
