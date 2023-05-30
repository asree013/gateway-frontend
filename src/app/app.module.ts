import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authen/login/login.component';
import { RegisterComponent } from './components/authen/register/register.component';
import { ProductHomeComponent } from './components/products/product-home/product-home.component';
import { ProductAdminComponent } from './admin/product/product-admin/product-admin.component';
import { ProductEditComponent } from './admin/product/product-edit/product-edit.component';
import { ProductCreateComponent } from './admin/product/product-create/product-create.component';
import { HeaderComponent } from './sub-components/header/header.component';
import { SidenavComponent } from './sub-components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './admin/menu/menu.component';
import { OrderCreateComponent } from './admin/order/order-create/order-create.component';
import { OrderAdminComponent } from './admin/order/order-admin/order-admin.component';
import { OrderEditComponent } from './admin/order/order-edit/order-edit.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { StatusPipe } from './pipe/status.pipe';
import { ProductDetailComponent } from './admin/product/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductHomeComponent,
    ProductAdminComponent,
    ProductEditComponent,
    ProductCreateComponent,
    HeaderComponent,
    SidenavComponent,
    MenuComponent,
    OrderCreateComponent,
    OrderAdminComponent,
    OrderEditComponent,
    OrderDetailComponent,
    StatusPipe,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
