import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchForUser } from 'src/app/models/class/branch.model';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthenService } from 'src/app/services/authen.service';
import * as $ from 'jquery';
import { BranchService } from 'src/app/services/branch.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  login: boolean = false;
  isBranch: BranchForUser[] = [];
  branchTitle: string = 'ยังไม่ได้เลือก';
  nikname: string 
  hasCalled: boolean
  branchUserStatus: any[] = [];
  constructor(
    public router: Router,
    private readonly userService: UsersService,
    private readonly location: Location,
  ) {}

  ngOnInit(): void {
    this.getDataLogin();

  }
  getDataLogin() {
    let id = localStorage.getItem('user_id');
    let branch_id = localStorage.getItem('branch_id');
    let branch_title = localStorage.getItem('branch_title');
    let status = localStorage.getItem('user_status')
    if (branch_id || branch_title) {
      this.branchTitle = branch_title;
    }
    if (id) {
        const sub = this.userService.findBrandUser(Number(id)).subscribe(
          async (result) => {
            if (result.length === 0) {
              console.log(result);
              
              const name = await this.userService
              .findUserById(Number(id))
              .toPromise();

              this.isBranch = result;
              this.nikname = name.user_nicename
              this.whereCallist();

              if(Number(status) === 1){
                return
              }
              else{
                Swal.fire({
                  title: 'คุณยังไม่มี Warehoue',
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: 'สร้าง Warehouse',
                  denyButtonText: `เข้าร่วม Warehouse`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    this.router.navigate(['/store/create']);
                  } else if (result.isDenied) {
                    this.router.navigate(['/store/menu']);
                  }
                });
              }
            }
            else{

              const name = await this.userService
              .findUserById(Number(id))
              .toPromise();
              console.log(name);
              
              this.isBranch = result;

              this.nikname = name.user_nicename
              this.whereCallist();
            }

          },
          (err) => {
            console.log('err Header: ', err);
          },
          () => {
            sub.unsubscribe();
          }
        );
    }
  }
  selectBranch(value: any) {
    if (value) {
      localStorage.setItem('branch_id', value.branch_id);
      localStorage.setItem('branch_title', value.title);
      this.branchTitle = value.title;
      window.location.reload();
    }
  }
  menuProfile() {
    let classEl = $('#prodfile_dropdown');
    if (!classEl.hasClass('openDropdown')) {
      classEl.addClass('openDropdown');
      classEl.slideToggle();
    } else {
      classEl.remove('openDropdown');
      classEl.slideToggle();
    }
  }
  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_status');
    localStorage.removeItem('branch_id')
    localStorage.removeItem('branch_title')
    localStorage.removeItem('local');
    localStorage.removeItem('session');
    this.router.navigate(['/authen/login']);
  }
  whereCallist() {
    if(this.isBranch){
      this.isBranch.map( (r) => {
        const sub = this.userService.findBranchByBranchId(r.branch_id).subscribe(
          result => {

            this.branchUserStatus = result
            const role = this.branchUserStatus.map(r => {
              return r.role === 0
            })
            if(role.length > 0){
              this.hasCalled = true
            }
            else{
              this.hasCalled = false
            }

          },
          () => {
            sub.unsubscribe()
          }
        )
      })

    }
  }
}
