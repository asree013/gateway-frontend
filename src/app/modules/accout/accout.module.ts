import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccoutAdminComponent } from 'src/app/admin/accouts/accout-admin/accout-admin.component';
import { AccoutCreateComponent } from 'src/app/admin/accouts/accout-create/accout-create.component';
import { AccoutEditComponent } from 'src/app/admin/accouts/accout-edit/accout-edit.component';
import { AccoutHistoryComponent } from 'src/app/admin/accouts/accout-history/accout-history.component';
import { AccoutHomeComponent } from 'src/app/admin/accouts/accout-home/accout-home.component';
import { FormsModule } from '@angular/forms';
import { SubComponentsModule } from '../SubComponentsModule/SubComponentsModule.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: AccoutHomeComponent,
  },
  {
    path: 'admin',
    component: AccoutAdminComponent,
  },
  {
    path: 'create',
    component: AccoutCreateComponent,
  },
  {
    path: 'edit/:id',
    component: AccoutEditComponent,
  },
  {
    path: 'history',
    component: AccoutHistoryComponent,
  },
];

@NgModule({
  declarations: [
    AccoutHomeComponent,
    AccoutCreateComponent,
    AccoutEditComponent,
    AccoutHistoryComponent,
    AccoutAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class AccoutModule {}
