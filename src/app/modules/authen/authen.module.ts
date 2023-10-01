import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from 'src/app/components/authen/register/register.component';
import { LoginComponent } from 'src/app/components/authen/login/login.component';
import { SubComponentsModule } from '../SubComponentsModule/SubComponentsModule.module';

import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SubComponentsModule,
    FormsModule,
    RouterModule.forChild(routes),

  ]
})
export class AuthenModule { }
