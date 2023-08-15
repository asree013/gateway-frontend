import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchForUser } from 'src/app/models/class/branch.model';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login:boolean = false
  isBranch: BranchForUser[] = []
  branchTitle: string = 'ยังไม่ได้เลือก'
  constructor(
    public router: Router,
    private readonly userService: UsersService,
    private readonly location: Location,
  ) { }

  ngOnInit(): void {
    this.getDataLogin()
  }
  getDataLogin() {
    let isLogin = localStorage.getItem('user_id')
    let branch_id = localStorage.getItem('branch_id')
    let branch_title = localStorage.getItem('branch_title')
    if(branch_id || branch_title){
      this.branchTitle = branch_title
    }
    if(isLogin){
      const sub = this.userService.findBrandUser(Number(isLogin)).subscribe(
        async result => {

          if(result.length === 0){
            await Swal.fire({
              position: 'center',
              icon: 'question',
              title: 'คุณยังไม่มีสโตร์ กรุณาสร้างสโตร์',
              confirmButtonText: 'สร้างสโตร์!!!',
            }).then(r => {
              if(r.isConfirmed){
                this.router.navigate(['/store/create'])
              }
            })
          }
          this.isBranch = result
          console.log('isBranch: ', this.isBranch);

        },
        async err => {
          console.log('err Header: ' ,err);
        },
        () => {
          sub.unsubscribe()
        }
      )
    }
  }
  selectBranch(value: any){
    if(value){
      localStorage.setItem('branch_id', value.branch_id)
      localStorage.setItem('branch_title', value.title)
      this.branchTitle = value.title
      window.location.reload()
    }
  }
}
