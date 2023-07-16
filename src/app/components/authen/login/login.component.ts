import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly service: AuthenService,
    private readonly swal: AlertService,
    private readonly router: Router,
    )
    { }

  ngOnInit(): void {
  }

  async onSubmitLogin(from: { username: string, password: string}){
    if(!from.username){
      this.swal.alert( 'warning', 'username is null' )
    }
    else if(from.username.length < 4) {
      this.swal.alert('warning', 'username is Less than 4')
    }
    else if(!from.password) {
      this.swal.alert('warning', 'password is null')
    }
    else if(from.password.length < 5) {
      this.swal.alert('warning', 'username is Less than 5')
    }
    else{
      this.postLogin(from)
    }

  }

  postLogin(value: { username: string, password: string}){
    this.service.login(value).subscribe(
      (result: any) => {
        console.log(result);
        if(result.token){
          localStorage.setItem('jwt', result.token)
          this.router.navigate(['/menu'])
        }
        else{
          this.swal.alert('error', 'Have Sonting Wrong')
        }
      },
      err => {
        console.log(err);

        if(err.status === 403){
          this.swal.alert('error', 'Username or Password Wrong!!!', 3000)
        }
      }
    )
  }

}
