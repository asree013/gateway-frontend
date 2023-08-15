import { Component, OnInit } from '@angular/core';
import { AccoutAll, AccoutSearchAdmin } from 'src/app/models/class/accout.model';
import { AccoutsService } from 'src/app/services/accouts.service';
import { AlertService } from 'src/app/services/alert.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { BranchForUser } from 'src/app/models/class/branch.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-accout-home',
  templateUrl: './accout-home.component.html',
  styleUrls: ['./accout-home.component.css'],
})
export class AccoutHomeComponent implements OnInit {
  accoutItem: AccoutAll[] = [];
  imageAccout: any = [];
  isAccoutDateNull: string;
  checkBranchInUser: BranchForUser[] = []
  showSelect: boolean
  myDate = new Date().toDateString();
  accoutFormMyBranch: any[] = []
  constructor(
    private readonly service: AccoutsService,
    private readonly swal: AlertService,
    public route: Router,
    private us: UsersService,
    private readonly branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.fetchAccout();
    this.getBranchUser()
  }
  fetchAccout() {

    const date = new Date().toISOString().split('T')
    const item = new AccoutSearchAdmin()
    item.date = date[0]


    item.branch_id = localStorage.getItem('branch_id')

    const sub = this.service.searchAccoutAdmin(item).subscribe(
      (result: any) => {
        if (result.status === 202) {
          this.isAccoutDateNull = result.message;
        } else {
          this.accoutItem = result;
        }
      },
      (err) => {
        console.log(err);
        this.swal.alert('error', JSON.stringify(err.message), 40000);
      },
      () => {
        sub.unsubscribe()
      }
    );
  }

  getBranchUser() {
    let user_id = localStorage.getItem('user_id')
    let status = localStorage.getItem('user_status')
    if(user_id){
      if(Number(status) === 1){
        const sub = this.branchService.getBranch().subscribe(
          result => {
           console.log(result);

          }
        )
      }
      else {
        const sub = this.us.findBrandUser(Number(user_id)).subscribe(
          result => {
            this.checkBranchInUser = result
            if(this.checkBranchInUser.length > 1){
              this.showSelect = true
            }else{
              this.showSelect = false
            }

          },
          err => {
            console.log(err);

          },
          () => {
            sub.unsubscribe()
          }
        )
      }
    }
    else{
      alert('กรุณารีเฟสใหม่')
    }
  }

  deleteAccoutItem(accout_id: number) {
    console.log('accout_id: ', accout_id);
    this.service.deleteAccout(accout_id).subscribe((result) => {
      this.swal.alert('success', 'deleted!!!');
      this.accoutItem = this.accoutItem.filter((r) => r.id !== accout_id);
    }),
      (err: any) => {
        console.log(err);
      };
  }
  showAccout(accout_id: number) {
    $(`#statement${accout_id}_slip`).slideToggle();
    this.service.getImageByAccoutId(accout_id).subscribe(
      (result) => {
        this.imageAccout = result;
        console.log(result);
      },
      (err) => {
        alert(err);
        console.log(err);
      }
    );
  }

  async selectAccout(type: string) {
    console.log(type);
    if (type === '') {
      $(`.tag`).removeClass('active');
      $('#all').addClass('active');
    } else if (type === 'income') {
      $('.tag').removeClass('active');
      $('#income').addClass('active');
    } else {
      $('.tag').removeClass('active');
      $('#payment').addClass('active');
    }
  }

  sumAll() {
    let sum = this.accoutItem.reduce((current, row) => {
      return current + row.total;
    }, 0);
    return Number(sum);
  }
  sumIncome() {
    let find = this.accoutItem.filter((r) => r.type_accout === 'รับเงิน');
    let sum = find.reduce((current, col) => {
      return current + col.total;
    }, 0);
    return Number(sum);
  }
  sumPayment() {
    let find = this.accoutItem.filter((r) => r.type_accout === 'จ่ายเงิน');
    let sum = find.reduce((current, collumn) => {
      return current + collumn.total;
    }, 0);
    return Number(sum);
  }
}
