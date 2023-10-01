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
import { StockModule } from './modules/stock/stock.module';
import { SubComponentsModule } from './modules/SubComponentsModule/SubComponentsModule.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StockModule,
    SubComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
