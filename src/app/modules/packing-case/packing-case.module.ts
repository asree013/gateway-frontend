import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingComponent } from 'src/app/components/packing-case/packing/packing.component';
import { PackingFormComponent } from 'src/app/components/packing-case/packing-form/packing-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes = [
  {
    path: '',
    component: PackingComponent
  },
  {
    path: ':id',
    component: PackingFormComponent
  }
]

@NgModule({
  declarations: [
    PackingComponent,
    PackingFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PackingCaseModule { }
