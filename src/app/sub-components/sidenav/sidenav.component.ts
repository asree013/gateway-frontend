import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    public readonly route: Router,
  ) { }

  ngOnInit(): void {}
  removeLocalStorge(){
    localStorage.removeItem('session')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_status')
    localStorage.removeItem('branch_id')
    localStorage.removeItem('branch_title')

    this.route.navigate(['/authen/login'])
  }

}
