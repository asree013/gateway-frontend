import { Component, OnDestroy, OnInit } from '@angular/core';
import { BranchCreateForUser, CreateWareHouse } from 'src/app/models/class/branch.model';
import { BranchService } from 'src/app/services/branch.service';
import * as $ from 'jquery';
import { AuthenService } from 'src/app/services/authen.service';
import {
  Districts,
  Provinces,
  Sectors,
  SubDistricts,
} from 'src/app/models/class/province.model';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-store-crete',
  templateUrl: './store-crete.component.html',
  styleUrls: ['./store-crete.component.css'],
})
export class StoreCreteComponent implements OnInit, OnDestroy {
  wareHouse: CreateWareHouse;
  isLoading: boolean;
  isSector: Sectors[] = [];
  sector_id: number;
  isProvince: Provinces[] = [];
  province_id: number;
  isDistrict: Districts[] = [];
  district_id: number;
  subDis: number;
  isSubDistrict: SubDistricts[] = [];
  interval: any
  constructor(
    private readonly branchService: BranchService,
    private readonly authen: AuthenService,
    private readonly swal: AlertService,
    private readonly route: Router,
    private readonly userService: UsersService,
  ) {}

  ngOnDestroy() {
    clearInterval(this.interval)
  }
  ngOnInit(): void {
    const sub = this.authen.getSector().subscribe(
      (result) => {
        this.isSector = result;
      },
      (err) => {
        console.log(err);
      },
      () => {
        sub.unsubscribe();
      }
    );
  }

  async selectAddress(value: { sector_id: number }) {
    if (value) {
      console.log(value.sector_id);

      const sub = this.authen.getProvince(value.sector_id).subscribe(
        (result) => {
          this.isProvince = result;
        },
        (err) => {
          console.log(err);
        },
        () => {
          sub.unsubscribe();
        }
      );
    }
  }

  selectProvince(value: { province_id: number }) {
    if (value) {
      this.province_id = value.province_id;
      console.log(value.province_id);
      const sub = this.authen.getDistrict(value.province_id).subscribe(
        (result) => {
          this.isDistrict = result;
        },
        () => {
          sub.unsubscribe();
        }
      );
    }
  }

  selectDistrict(value: { district_id: number }) {
    if (value) {
      this.district_id = value.district_id;
      console.log(value.district_id);
      const sub = this.authen.getSubDistrict(value.district_id).subscribe(
        (result) => {
          this.isSubDistrict = result;
        },
        () => {
          sub.unsubscribe();
        }
      );
    }
  }

  selectCity(value: { city_id: number }) {
    if (value) {
      this.subDis = value.city_id;
    }
  }

  async CreateWareHouse(value: CreateWareHouse) {
    this.isLoading = true;
    const idUser = localStorage.getItem('user_id');
    const getProvince: any = await this.authen.getProvinceById(this.province_id).toPromise();
    const subDistrict: any = await this.authen.getSubDistrictById(this.subDis).toPromise();

    if (getProvince || subDistrict) {

      try {
        const create = new CreateWareHouse();
        create.title = value.title;
        create.address = value.address;
        create.city = subDistrict.name_th;
        create.province = getProvince.name_th;
        create.postcode = subDistrict.zip_code;
        create.email = value.email;
        create.phone = value.phone;
        create.country = 'TH'
        create.user_id = Number(idUser);
        console.log(create);

        const createWarehouse = await this.branchService.createBranch(create).toPromise()

        const createBranch = new BranchCreateForUser()
        createBranch.branch_id = createWarehouse.id
        createBranch.user_id = Number(idUser)
        createBranch.role = 1

        const createWhForUser = await this.userService.createBranchForUser(createBranch).toPromise()
        
        if(createWhForUser) {
          this.isLoading = false;
          this.swal.alert('success', 'Create store Success!!!', 2000)
          await window.location.reload()
          this.interval = setInterval(() => {
            this.route.navigate(['/menu'])
          }, 2000)
        }
      } catch (error) {
        this.swal.alert('error', JSON.stringify(error), 4500)
      }
    }
    else {
      this.isLoading = false
      this.swal.alert('error', 'กรูณากรอกที่อยู่' ,3000)
    }
  }
}
