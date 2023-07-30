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
    localStorage.removeItem('local')
    localStorage.removeItem('branch_id')
    this.route.navigate(['/login'])
  }

}
