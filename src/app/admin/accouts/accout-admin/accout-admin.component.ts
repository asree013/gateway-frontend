import { Component, OnInit } from '@angular/core';
import {
  Accout,
  AccoutAll,
  AccoutOnDate,
  AccoutSearchAdmin,
} from 'src/app/models/class/accout.model';
import { AccoutsService } from 'src/app/services/accouts.service';
import { AlertService } from 'src/app/services/alert.service';
import * as $ from 'jquery';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/class/branch.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accout-admin',
  templateUrl: './accout-admin.component.html',
  styleUrls: ['./accout-admin.component.css'],
})
export class AccoutAdminComponent implements OnInit {
  accoutItem: AccoutAll[] = [];
  imageAccout: any = [];
  isAccoutDateNull: string;
  branchItem: Branch[] = [];
  isLoading: boolean;
  showAccouta: boolean
  noImage: string = environment.noImgae
  constructor(
    private readonly service: AccoutsService,
    private readonly swal: AlertService,
    private readonly branchService: BranchService,
    public readonly route: Router,
  ) {}

  ngOnInit(): void {
    this.fetchAccout();
    this.feedBranch();
  }
  fetchAccout() {
    this.isLoading = true;
    this.service.searchAccoutAdmin().subscribe(
      (result: any) => {
        console.log(result);
        this.isLoading = false;
        if (result.status === 202) {
          this.isAccoutDateNull = result.message;
        } else {
          this.accoutItem = result;
          console.log(result.pic_accout);

        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.swal.alert('error', JSON.stringify(err.message), 1400);
      }
    );
  }

  deleteAccoutItem(accout_id: number) {
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
    this.showAccouta = true
  }

  async selectAccout(type: string) {
    this.isLoading = true
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
  feedBranch() {
    this.branchService.getBranch().subscribe(
      (result: any) => {
        this.branchItem = result;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  screeningDate(item: AccoutSearchAdmin) {
    if (!item.branch_id && !item.date) {
      alert('is null');
    }
    this.isLoading = true;
    const sub = this.service.searchAccoutAdmin(item).subscribe(
      (result: any) => {
        console.log(result);

        if (result.status === 202) {
          this.isLoading = false;
          this.isAccoutDateNull = result.message;
          this.accoutItem = [];
        } else {
          this.isAccoutDateNull = null;
          this.isLoading = false;
          this.accoutItem = result;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log('search err', err);
      },
      () => {
        sub.unsubscribe()
      }
    );

  }
  sumAll() {
    let sum = this.accoutItem.reduce((current, row) => {
      return current + row.total
    }, 0);
    return Number(sum)
  }
  sumIncome() {
    let find = this.accoutItem.filter(r => r.type_accout === 'รับเงิน')
    let sum = find.reduce((current, col) => {
      return current + col.total
    }, 0)
    return Number(sum)
  }
  sumPayment(){
    let find = this.accoutItem.filter(r => r.type_accout === 'จ่ายเงิน')
    let sum = find.reduce((current, collumn) => {
      return current + collumn.total
    }, 0)
    return Number(sum)
  }
}
