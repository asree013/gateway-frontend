import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCreteComponent } from 'src/app/components/store/store-crete/store-crete.component';
import { StoreMenuComponent } from 'src/app/components/store/store-menu/store-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { SubComponentsModule } from '../SubComponentsModule/SubComponentsModule.module';

import { FormsModule } from '@angular/forms';
import { RoleWarehousePipe } from 'src/app/pipe/role-warehouse.pipe';

const routes: Routes = [
  {
    path: 'create',
    component: StoreCreteComponent
  },
  {
    path: 'menu',
    component: StoreMenuComponent
  },
]

@NgModule({
  declarations: [
    StoreCreteComponent,
    StoreMenuComponent,
    RoleWarehousePipe,
  ],
  imports: [
    CommonModule,
    SubComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class BranchModule { }
