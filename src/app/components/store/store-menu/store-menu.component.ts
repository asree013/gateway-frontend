import { Component, OnInit } from '@angular/core';
import {
  Branch,
  BranchCreateForUser,
  BranchForUser,
  WarehouseUser,
} from 'src/app/models/class/branch.model';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery';
import { Search } from 'src/app/models/class/searh.model';
import { BranchService } from 'src/app/services/branch.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-store-menu',
  templateUrl: './store-menu.component.html',
  styleUrls: ['./store-menu.component.css'],
})
export class StoreMenuComponent implements OnInit {
  isNotBranchInDataBase: string;
  myBranch: BranchForUser[] = [];
  users: WarehouseUser[] = [];
  title: string;
  isTitle: boolean;
  isEmail: boolean;
  isPhone: boolean;
  isCLick: boolean
  isSearch: boolean
  isLoadding: boolean
  isDetail: boolean
  isReader: boolean
  isEditer: boolean
  isAdminer: boolean
  dataSearched: Branch[] = []
  dataSearch = new Search<Partial<any>>();
  noImage: string = environment.noImgae
  constructor(
    private readonly userService: UsersService,
    private readonly branchService: BranchService,
    private readonly swal: AlertService,
    ) {}

  ngOnInit(): void {
    this.getBranch();
    this.selectTitle();
  }
  getBranch() {
    let id = localStorage.getItem('user_id');
    this.isLoadding = true

    const sub = this.userService.findBrandUser(Number(id)).subscribe(
      (result) => {
        console.log(result);
        if (result.length === 0) {
          this.isNotBranchInDataBase = 'ยังไม่มี warehouse';
        }
        console.log('res: ', result);
        this.isLoadding = false
        this.myBranch = result;
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  whereBranchById(bracnh_id: number) {
    this.isSearch = false
    this.isDetail = false
    const sub = this.userService.findBranchByBranchId(bracnh_id).subscribe(
      (result) => {
        console.log(result);
        this.isCLick = true
        this.users = result;
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  searchWarehouse(event: Event) {
    this.isCLick = false
    let txt = (event.target as HTMLInputElement);
    if(txt.id === 'title'){
      this.dataSearch.data = {}
      this.dataSearch.data[txt.id = 'title'] = txt.value
      this.serachData()

    }
    if(txt.id === 'email'){
      this.dataSearch.data = {}
      this.dataSearch.data[txt.id = 'email'] = txt.value
      this.serachData()
    }
    if(txt.id === 'phone'){
      this.dataSearch.data = {}
      this.dataSearch.data[txt.id = 'phone'] = txt.value
      this.serachData()
    }

  }

  selectTitle() {
    let value = $('select').val();
    this.isTitle = true;
    this.isEmail = false;
    this.isPhone = false
    if (value === 'email') {
      this.isEmail = true;
      this.isTitle = false
      this.isPhone = false
    }
    if(value === 'phone'){
      this.isEmail = false;
      this.isTitle = false
      this.isPhone = true
    }
  }

  serachData() {
    console.log('search');
    const sub = this.branchService.search(this.dataSearch).subscribe(
      result => {
        console.log(result);
        this.isCLick = false
        this.isSearch = true
        this.dataSearched = result
      },
      err => {
        console.log(err);

      },
      () => {
        sub.unsubscribe()
      }
    )
  }

  addBranch(id: number) {
    let user_id = localStorage.getItem('user_id')
    if(user_id){
      const add = new BranchCreateForUser()
      add.branch_id = id
      add.user_id = Number(user_id)
      add.role = 0
      const sub = this.userService.createBranchForUser(add).subscribe(
        result => {
          console.log(result);
          this.swal.alert('success', 'Join Warehouse Complete')
          this.getBranch()
        },
        err => {
          console.log(err);
          this.swal.alert('error', JSON.stringify(err))
        },
        () => {
          sub.unsubscribe()
        }
      )
    }
  }
  isNotComfirm() {
    this.swal.alert('warning', 'กรุณารอการยืนยันจากผู้ดูแล Warehouse', 5000)
  }
  openDeatail(role: number) {
    console.log(role);

    this.isDetail = true
    this.isSearch = false
    this.isCLick = false

    if(role === 0){

    }
    else if(role === 1){
      this.isAdminer = true
    }
    else if(role === 2){
      this.isEditer = true
    }
    else{
      this.isReader = true
    }
  }
  selectRole(value: string, event: any) {
    console.log(event);
    console.log('value: ', value);

  }
}
