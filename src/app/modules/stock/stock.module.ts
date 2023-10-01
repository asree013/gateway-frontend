import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCreateByidComponent } from 'src/app/components/stock/stock-create-byid/stock-create-byid.component';
import { StockCreateComponent } from 'src/app/components/stock/stock-create/stock-create.component';
import { FormsModule } from '@angular/forms';
import { StockAdminComponent } from 'src/app/components/stock/stock-admin/stock-admin.component';
import { StockEditComponent } from 'src/app/components/stock/stock-edit/stock-edit.component';
import { StockHomeComponent } from 'src/app/components/stock/stock-home/stock-home.component';
import { SubComponentsModule } from '../SubComponentsModule/SubComponentsModule.module';




@NgModule({
  declarations: [
    StockCreateComponent,
    StockCreateByidComponent,
    StockHomeComponent,
    StockEditComponent,
    StockAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubComponentsModule,
  ]
})
export class StockModule {}
