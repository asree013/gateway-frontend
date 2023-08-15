import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './sub-components/header/header.component';
import { SidenavComponent } from './sub-components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './admin/menu/menu.component';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { StockModule } from './modules/stock/stock.module';
import { AccoutModule } from './modules/accout/accout.module';
import { LoaddingModule } from './modules/loadding/loadding.module';
import { AuthenModule } from './modules/authen/authen.module';
import { StoreCreteComponent } from './components/store/store-crete/store-crete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MenuComponent,
    StoreCreteComponent,
  ],
  imports: [
    AccoutModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ProductsModule,
    OrdersModule,
    StockModule,
    LoaddingModule,
    AuthenModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
