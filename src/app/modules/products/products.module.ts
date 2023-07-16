import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAdminComponent } from 'src/app/admin/product/product-admin/product-admin.component';
import { ProductCreateComponent } from 'src/app/admin/product/product-create/product-create.component';
import { ProductEditComponent } from 'src/app/admin/product/product-edit/product-edit.component';
import { ProductHomeComponent } from 'src/app/components/products/product-home/product-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from 'src/app/admin/product/product-detail/product-detail.component';


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
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
