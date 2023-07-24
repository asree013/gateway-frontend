import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  disableButton: boolean = false;
  constructor(
    private readonly service: AuthenService,
    private readonly swal: AlertService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    if(this.service.isLogin() === true){
      this.router.navigate(['/menu'])
    }
  }
  async onSubmitLogin(form: { username: string; password: string, remember: boolean }) {
    let form_control = document.querySelector('.form-control')
    let userName = document.getElementById('username')
    let passWord = document.getElementById('password')

    form_control.classList.remove('is-invalid')
    passWord.classList.remove('is-invalid')

    if (!form.username) {
      userName.classList.add('is-invalid')
      this.swal.alert('warning', 'username is null');
    } else if (form.username.length < 4) {
      userName.classList.add('is-invalid')
      this.swal.alert('warning', 'username is Less than 4');
    } else if (!form.password) {
      passWord.classList.add('is-invalid')
      this.swal.alert('warning', 'password is null');
    } else if (form.password.length < 5) {
      passWord.classList.add('is-invalid')
      this.swal.alert('warning', 'username is Less than 5');
    } else {
      this.postLogin(form);
    }
  }

  postLogin(value: { username: string; password: string, remember: boolean }) {
    this.disableButton = true;
    this.service.login(value).subscribe(
      (result: any) => {
        if (result.token) {
          const day = new Date().toISOString();
          const date: Date = new Date(day)
          const session = {
            jwt: result.token,
            exp: new Date().getTime(),
            expdate: this.addHours(date, 1),
            isLogin: 'ok',
            remember: value.remember
          }
          this.disableButton = false;
          localStorage.setItem('session', JSON.stringify(session))
          // localStorage.setItem('isLogin', true)
          this.router.navigate(['/menu'])
        } else {
          this.disableButton = false;
          this.swal.alert('error', 'Have Sonting Wrong');
        }
      },
      (err) => {
        console.log(err);
        this.disableButton = false;
        this.swal.alert('error', 'have somting in server !!!', 5000)
        if (err.status === 403) {
          this.swal.alert('error', 'Username or Password Wrong!!!', 3000);
        }
      }
    );
  }

  addHours (date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  };

}
