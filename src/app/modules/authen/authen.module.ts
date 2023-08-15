import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from 'src/app/components/authen/register/register.component';
import { LoginComponent } from 'src/app/components/authen/login/login.component';
import { LoaddingModule } from '../loadding/loadding.module';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    LoaddingModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthenModule { }
