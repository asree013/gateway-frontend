import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaddingComponent } from 'src/app/components/loadding/loadding.component';
import { InputModalComponent } from 'src/app/components/input-modal/input-modal.component';
import { ModalEditStockComponent } from 'src/app/components/modal-edit-stock/modal-edit-stock.component';

@NgModule({
  declarations: [
    LoaddingComponent,
    InputModalComponent,
    ModalEditStockComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaddingComponent,
    InputModalComponent,
    ModalEditStockComponent
  ]
})
export class SubComponentsModule { }
