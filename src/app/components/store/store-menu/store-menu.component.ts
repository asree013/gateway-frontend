import { Component, OnInit } from '@angular/core';
import {
  Branch,
  BranchCreateForUser,
  BranchForUser,
  SearchBranch,
  Warehouse,
  WarehouseUser,
} from 'src/app/models/class/branch.model';
import { UsersService } from 'src/app/services/users.service';
import * as $ from 'jquery';
import { Search } from 'src/app/models/class/searh.model';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { Users } from 'src/app/models/class/users.model';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

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
  role: number
  status: any[] = []
  isAdmin: boolean
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

  async whereBranchById(bracnh_id: number) {
    this.isSearch = false
    this.isDetail = false
    const result = await firstValueFrom(this.userService.findBranchByBranchId(bracnh_id))
    if(result){
      console.log("where branch ID: ", result);
      this.isCLick = true
      console.log(result);     
      this.users = result;
      this.desablePremision(bracnh_id)
    }
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
  responseInvite(branch_id: number) {
    Swal.fire({
      title: 'ตอบรับคำเชิญ',
      text: "คุณต้องการตอบรับคำเชิญนี้หรือไหม โปรดตรวจสอบให้ล่ะเอียด",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'เข้ามร่วม',
      cancelButtonText: "ยกเลิก"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const join = {} as BranchCreateForUser
          join.branch_id = branch_id
          join.user_id = Number(localStorage.getItem('user_id'))
          join.role = 3
          const responseJoin = await firstValueFrom(this.userService.updateRoleWarehouse(join))
          if(responseJoin){
            const update = await firstValueFrom(this.userService.findBrandUser(join.user_id))
            this.myBranch = update
            this.swal.alert('success', "คุณได้เข้าร่วมแล้ว", 3000)
          }
        } catch (error) {
          this.swal.alert('error', 'เกิดข้อผิดพลาด', 5000)
        }
      }
    })
  }
  openDeatail(item: WarehouseUser) {
    this.itemDetail = item
    this.role = item.role
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
        icom3: "assets/icon/cross.png",
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
  updateRole() {
    const updateRole = {} as Warehouse
    updateRole.branch_id = this.itemDetail.branch_id
    updateRole.user_id = this.itemDetail.user_id
    updateRole.role = this.role
    Swal.fire({
      title: 'โปรดเช็คให้แน่ใจ',
      text: "คุณต้องการกำหนดสิทธินี้หรือไหม?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'มอบสิทธินี้',
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        const sub = this.userService.updateRoleWarehouse(updateRole).subscribe(
          async result => {
            console.log(result);
            this.swal.alert('success', 'มอบสิทธิเรียบร้อย ', 2000)
            try {
              const updata = await this.userService.findBranchByBranchId(this.itemDetail.branch_id).toPromise()
              this.users = updata
              this.isDetail = false
              this.isCLick = true
            } catch (error) {
              this.swal.alert('error', JSON.stringify(error), 3500)
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
    })
  }
  async desablePremision(bracnh_id: number) {
    const warehouse = {} as BranchCreateForUser
    warehouse.branch_id = bracnh_id
    warehouse.user_id = Number(localStorage.getItem('user_id'))
    const findPremision = await firstValueFrom(this.userService.findWarehouseByUser_idAndBranch_id(warehouse))
    if(findPremision.role === 1){
      this.isAdmin = false
    }
    else{
      this.isAdmin = true
    }
  }
}
