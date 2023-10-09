import { Component, OnInit } from '@angular/core';
import {
  Branch,
  BranchCreateForUser,
  BranchForUser,
  SearchBranch,
  WarehouseUser,
} from 'src/app/models/class/branch.model';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery';
import { Search } from 'src/app/models/class/searh.model';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { Users } from 'src/app/models/class/users.model';
import Swal from 'sweetalert2';

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
  isEmail: boolean;
  isPhone: boolean;
  isCLick: boolean
  isSearch: boolean
  isLoadding: boolean
  isDetail: boolean
  isReader: boolean
  isEditer: boolean
  isAdminer: boolean
  dataSearched: Users[] = []
  dataSearch = new Search<Partial<any>>();
  noImage: string = environment.noImgae
  objSearch: SearchBranch = {} as SearchBranch
  itemDetail: WarehouseUser = {} as WarehouseUser
  status: any[] = []
  constructor(
    private readonly userService: UsersService,
    private readonly swal: AlertService,
    ) {}

  ngOnInit(): void {
    this.getBranch();
    this.feedStatus()
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
        console.log("where branch ID: ", result);
        this.isCLick = true
        console.log(result);
        
        this.users = result;
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  serachData(event: Event) {
    const email = (event.target as HTMLInputElement).value
    const sub = this.userService.findUserByEmial(email).subscribe(
      result => {
        this.dataSearched = result    
        this.isSearch = true
      },
      err => {
        console.log(err);   
      },
      () => {
        sub.unsubscribe()
      }
    )
  }

  inviteForBranch(id: number) {
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
  openDeatail(item: WarehouseUser) {
    this.itemDetail = item
    this.isDetail = true
    this.isSearch = false
    this.isCLick = false

    if(item.role === 0){

    }
    else if(item.role === 1){
      this.isAdminer = true
    }
    else if(item.role === 2){
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
  inviteUser(branch_id: number){
    this.objSearch.search = true
    this.objSearch.branch_id = branch_id
  }
  deleteUserInWarehouse(warehouse: number) {
    Swal.fire({
      title: 'คุณต้องการลบออกจาก Warehous หรือไม่?',
      text: "โปรดยืนยันที่จะลบ ออกจาก Warehous",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoadding = true
        const sub = this.userService.deleteUserBranch(warehouse).subscribe(
          result => {
            this.myBranch = this.myBranch.filter(r => r.id !== warehouse)
            this.users = this.users.filter(r => r.id !== warehouse)
            this.isLoadding = false
            this.isDetail = false
            this.isCLick = true             
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'ลบจาก Warehouse',
              showConfirmButton: false,
              timer: 1500
            })
          },
          err => {
            this.swal.alert('error', JSON.stringify(err))
            console.log(err);
            this.isLoadding = false
          },
          () => {
            sub.unsubscribe()
          }
        )
      }
    })
  }
  feedStatus() {
    const statusDetail = [
      {
        id: 0,
        title: "รอยืยยัน",
        icon1: "assets/icon/cross.png",
        icon2: "assets/icon/cross.png",
        icom3: "assets/icon/cross.png"
      },
      {
        id: 1,
        title: "ผู้ดูแล",
        icon1: "assets/icon/check_green.png",
        icon2: "assets/icon/cross.png",
        icom3: "assets/icon/cross.png"
      },
      {
        id: 2,
        title: "แก้ไขข้อมูล",
        icon1: "assets/icon/cross.png",
        icon2: "assets/icon/check_green.png",
        icom3: "assets/icon/cross.png"
      },
      {
        id: 3,
        title: "อ่านข้อมูล",
        icon1: "assets/icon/cross.png",
        icon2: "assets/icon/cross.png",
        icon3: "assets/icon/check_green.png"
      },
    ]
    this.status = statusDetail
  }
}
