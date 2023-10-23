import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAdminComponent } from 'src/app/admin/order/order-admin/order-admin.component';
import { OrderCreateComponent } from 'src/app/admin/order/order-create/order-create.component';
import { OrderDetailComponent } from 'src/app/admin/order/order-detail/order-detail.component';
import { OrderEditComponent } from 'src/app/admin/order/order-edit/order-edit.component';
import { StatusPipe } from 'src/app/pipe/status.pipe';
import { FormsModule } from '@angular/forms';
import { OrderHomeComponent } from 'src/app/components/orders/order-home/order-home.component';
import { RouterModule, Routes } from '@angular/router';
import { SubComponentsModule } from '../SubComponentsModule/SubComponentsModule.module';

const route: Routes = [
 {
  path: 'admin',
  component: OrderAdminComponent
 },
{
  path: 'home',
  component: OrderHomeComponent
},
{
  path: 'edit/:id',
  component: OrderEditComponent
},
{
  path: 'detail/:id',
  component: OrderDetailComponent
}
]

@NgModule({
  declarations: [
    OrderCreateComponent,
    OrderAdminComponent,
    OrderEditComponent,
    OrderDetailComponent,
    OrderHomeComponent,
    StatusPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    SubComponentsModule,

  ]
})
export class OrdersModule {}
