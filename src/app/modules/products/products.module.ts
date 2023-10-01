import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from 'src/app/components/products/product-home/product-home.component';
import { ProductAdminComponent } from 'src/app/admin/product/product-admin/product-admin.component';
import { ProductCreateComponent } from 'src/app/admin/product/product-create/product-create.component';
import { ProductEditComponent } from 'src/app/admin/product/product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from 'src/app/admin/product/product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SubComponentsModule } from '../SubComponentsModule/SubComponentsModule.module';


const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent
  },
  {
    path: 'admin',
    component: ProductAdminComponent
  },
  {
    path: 'create',
    component: ProductCreateComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'admin/detail/:id',
    component: ProductDetailComponent
  },
]
@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductAdminComponent,
    ProductEditComponent,
    ProductCreateComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SubComponentsModule,
  ]
})
export class ProductsModule { }
