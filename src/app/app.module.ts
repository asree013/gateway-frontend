import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authen/login/login.component';
import { RegisterComponent } from './components/authen/register/register.component';
import { HeaderComponent } from './sub-components/header/header.component';
import { SidenavComponent } from './sub-components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './admin/menu/menu.component';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AccoutHomeComponent } from './admin/accouts/accout-home/accout-home.component';
import { AccoutCreateComponent } from './admin/accouts/accout-create/accout-create.component';
import { AccoutEditComponent } from './admin/accouts/accout-edit/accout-edit.component';
import { AccoutHistoryComponent } from './admin/accouts/accout-history/accout-history.component';
import { AccoutAdminComponent } from './admin/accouts/accout-admin/accout-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidenavComponent,
    MenuComponent,
    AccoutHomeComponent,
    AccoutCreateComponent,
    AccoutEditComponent,
    AccoutHistoryComponent,
    AccoutAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ProductsModule,
    OrdersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
