import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccoutCreate, ImagesCreate } from 'src/app/models/class/accout.model';
import { AccoutsService } from 'src/app/services/accouts.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { BranchService } from 'src/app/services/branch.service';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { BranchForUser } from 'src/app/models/class/branch.model';
@Component({
  selector: 'app-accout-create',
  templateUrl: './accout-create.component.html',
  styleUrls: ['./accout-create.component.css'],
})
export class AccoutCreateComponent implements OnInit {
  constructor(
    private readonly authen: AuthenService,
    private readonly swal: AlertService,
    private readonly accout: AccoutsService,
    private readonly location: Location,
    private readonly branch: BranchService,
    public readonly route: Router,
    private readonly userService :UsersService
  ) {}
  isUploadImages: boolean;
  isLoadding: boolean
  imagesName: ImagesCreate[] = [];
  branchItemAll: any[] = [];
  branchItemForUser: any[] = [];
  objitem = {};
  isAdmin: boolean

  async ngOnInit(): Promise<void> {
    let getStatus = localStorage.getItem('user_status')
    if(Number(getStatus) === 1){
      this.isAdmin = true
    }
    else{
      this.isAdmin = false
    }
    console.log(this.imagesName);
    this.getBranchAll()
    this.getBranchUser()
  }

  submitAccout(item: AccoutCreate) {
    let select = document.getElementById('select');
    let title = document.getElementById('titel');
    let detail = document.getElementById('detail');
    let total = document.getElementById('total');
    let branch = document.getElementById('branch');

    select.classList.remove('is_invalid');
    title.classList.remove('is_invalid');
    detail.classList.remove('is_invalid');
    total.classList.remove('is_invalid');
    branch.classList.remove('is_invalid');

    if (item.type_accout !== 'รับเงิน' && item.type_accout !== 'จ่ายเงิน') {
      this.swal.alert('error', 'คุณยังไม่ได้เลืกประเภท');
      select.classList.add('is_invalid');
    } else if (!item.title) {
      this.swal.alert('error', 'กรุณาเพิ่มข้อมูล Title');
      title.classList.add('is_invalid');
    } else if (!item.detail) {
      this.swal.alert('error', 'กรุณาเพิ่มข้อมูล detail');
      detail.classList.add('is_invalid');
    } else if (!item.total) {
      this.swal.alert('error', 'กรุณาเพิ่มข้อมูล total');
      total.classList.add('is_invalid');
    } else if (item.branch_id == 0) {
      this.swal.alert('error', 'กรุณาเพิ่มข้อมูล สาขา');
      branch.classList.add('is_invalid');
    } else {
      this.createAccout(item);
    }
  }
  getBranchAll() {
    const sub = this.branch.getBranch().subscribe(
      result => {
      this.branchItemAll = result;
      },
      err => {
        console.log(err);
      },
      () => {
        sub.unsubscribe()
      }
    )
  }
  getBranchUser() {
    let id = localStorage.getItem('user_id')
    const sub = this.userService.findBrandUser(Number(id)).subscribe(
      result => {
        console.log(result);
        this.branchItemForUser = result
      },
      err => {
        console.log(err);

      },
      () => {
        sub.unsubscribe()
      }
    )
  }
  uploadImages(event: Event) {
    this.isUploadImages = true;
    const formdata = new FormData();
    const value = event.target as HTMLInputElement;
    for (let index = 0; index < value.files.length; index++) {
      const element = value.files[index];
      formdata.append('files', element);
    }
    this.authen.uploadImages(formdata).subscribe(
      (result: any) => {
        console.log(result);
        this.isUploadImages = false;
        this.imagesName.push(result);
      },
      (err) => {
        console.log(err);
        this.isUploadImages = false;
      }
    );
  }

  createAccout(item: AccoutCreate) {
    // this.isLoadding = true
    const user_id = localStorage.getItem('user_id');

    const value = {
      type_accout: item.type_accout,
      title: item.title,
      detail: item.detail,
      total: item.total,
      user_id: Number(user_id),
      branch_id: item.branch_id,
    };
    this.isUploadImages = true;

    if (this.imagesName.length > 0) {
      const sub = this.accout.addAccout(value).subscribe(
        (result: any) => {
          console.log('is upload images: ', result.id);
          for (let i = 0; i < this.imagesName.length; i++) {
            const element = this.imagesName[i];
            this.objitem = {
              accout_id: result.id,
              image: element,
            };
            console.log(this.objitem);
            this.accout.addImagesAccout(result.id, element).subscribe(
              (result) => {
                console.log(result);
                this.isLoadding = false
                this.isUploadImages = false;
                this.location.back();
              },
              (err) => {
                console.log(err);
              }
            );
          }
        },
        (err) => {
          this.isLoadding = false
          console.log(err);
          this.isUploadImages = false;
        },
        () => {
          sub.unsubscribe()
        }
      );
    } else {
      const sub = this.accout.addAccout(value).subscribe(
        (result: any) => {
          console.log(result.id);
          this.isUploadImages = false;
          this.isLoadding = false
          this.location.back();
        },
        (err) => {
          console.log(err);
          this.isUploadImages = false;
          this.isLoadding = false
        },
        () => {
          sub.unsubscribe()
        }
      );
    }
  }
}
