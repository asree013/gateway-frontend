import { Component, OnInit } from '@angular/core';
import { AuthenService } from './services/authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gateway-frontend';

  constructor(public readonly service: AuthenService) {}
  ngOnInit(): void {
    if(this.service.isLogin() === true && this.service.isLogin() !== null){

    }
  }

}
