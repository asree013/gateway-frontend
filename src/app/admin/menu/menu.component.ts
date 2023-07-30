import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchForUser, BranchCreateForUser } from 'src/app/models/class/branch.model';
import { AlertService } from 'src/app/services/alert.service';
import { BranchService } from 'src/app/services/branch.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  allBranch: any[] = [];
  constructor(
    public router: Router,
    private readonly service: BranchService,
    private readonly swal: AlertService,
    private readonly userService: UsersService
  ) {
    this.isHaveIdBranch()
  }

  ngOnInit(): void {
    this.selectBranch();
  }
  chengeSelectBranch(value: { branch: number }) {
    $('.form-select').removeClass('is-invalid');
    if (value.branch == 0) {
      this.swal.alert('warning', 'กรุณาเลือกสาขา!!!', 2000);
      $('.form-select').addClass('is-invalid');
    } else {
      let local = localStorage.getItem('local');
      let id = JSON.parse(local);
      const createBranch = new BranchCreateForUser();
      createBranch.branch_id = value.branch;
      createBranch.user_id = id.user_id;
      Swal.fire({
        title: 'คุณเลือกสาขาแล้วหรือไม่',
        text: 'ฉันได้เลือกสาขาที่ฉันอยู่แล้ว',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.swal.alert('success', 'เพิ่มข้อมูลสาขาแล้ว');
          this.userService.createBranchForUser(createBranch).subscribe(
            result => {
              console.log(result);
              localStorage.setItem('branch_id', JSON.stringify(result.branch_id));
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    }
  }
  isHaveIdBranch() {
    let idBranch = localStorage.getItem('branch_id')
    console.log('idBranch: ', idBranch);
    if(!idBranch){
      $('.modalBranch').addClass('openModal')
    }
    else{
      $('.modalBranch').removeClass('openModal')
    }

  }
  selectBranch() {
    this.service.getBranch().subscribe(
      (result: any) => {
        console.log(result);

        this.allBranch = result;
      },
      (err) => {
        alert(err);
      }
    );
  }
}
