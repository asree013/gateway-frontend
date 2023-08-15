import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaddingComponent } from 'src/app/components/loadding/loadding.component';



@NgModule({
  declarations: [
    LoaddingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LoaddingComponent]
})
export class LoaddingModule { }
