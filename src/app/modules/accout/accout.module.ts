import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccoutAdminComponent } from 'src/app/admin/accouts/accout-admin/accout-admin.component';
import { AccoutCreateComponent } from 'src/app/admin/accouts/accout-create/accout-create.component';
import { AccoutEditComponent } from 'src/app/admin/accouts/accout-edit/accout-edit.component';
import { AccoutHistoryComponent } from 'src/app/admin/accouts/accout-history/accout-history.component';
import { AccoutHomeComponent } from 'src/app/admin/accouts/accout-home/accout-home.component';
import { FormsModule } from '@angular/forms';
import { LoaddingModule } from '../loadding/loadding.module';



@NgModule({
  declarations: [
    AccoutHomeComponent,
    AccoutCreateComponent,
    AccoutEditComponent,
    AccoutHistoryComponent,
    AccoutAdminComponent,],
  imports: [
    CommonModule,
    FormsModule,
    LoaddingModule,
  ]
})
export class AccoutModule { }
