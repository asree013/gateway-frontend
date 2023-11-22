import { Component, OnInit } from '@angular/core';
import {
  Branch,
} from 'src/app/models/class/branch.model';
import { Billing, Customers, CustomersFormCreate, Shipping } from 'src/app/models/interface/woocommerce.model';
import * as $ from 'jquery';
import { AlertService } from 'src/app/services/alert.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { Districts, Provinces, Sectors, SubDistricts } from 'src/app/models/class/province.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  branchItem: Branch[] = [];
  customer: Customers;
  isSector: Sectors[] = []
  isProvince: Provinces[] = []
  isDistrict: Districts[] = []
  isSubDistrict: SubDistricts[] = []
  branchArray: Array<number> = [];
  isValidate: boolean = false;
  isLoadding: boolean
  disable = true
  province_id: number
  province_id_sp: number
  subDis_id: number
  subDis_id_sp: number
  constructor(
    private readonly swal: AlertService,
    private readonly userSrevice: UsersService,
    private readonly route: Router,
    private readonly authen: AuthenService,
  ) {}

  ngOnInit(): void {
    this.getSecTor()

  }
  async selectBillign(value: any) {
    if(value){
      $("#province").removeClass('closeSelect')
      $("#province").addClass('openSelect')
      let sectot_id = value
      const getProvince = await this.authen.getProvince(sectot_id).toPromise()
      if(getProvince){
        this.isProvince = getProvince
        let province = document.getElementById('province')
        province.addEventListener('change', async ($event) => {
        this.province_id = Number(($event.target as HTMLInputElement).value)

          $("#district").removeClass('closeSelect')
          $("#district").addClass('openSelect')

          let get_district = await this.authen.getDistrict(this.province_id).toPromise()
          if(get_district){
            this.isDistrict = get_district
            let subDistrict = document.getElementById('district')
            subDistrict.addEventListener('change', async (p) => {
              let district_id = (p.target as HTMLInputElement).value
              let subDis = await this.authen.getSubDistrict(Number(district_id)).toPromise()
              if(subDis){
                this.isSubDistrict = subDis
                $("#subDistrict").removeClass('closeSelect')
                $("#subDistrict").addClass('openSelect')
                let tambol = document.getElementById('subDistrict')
                tambol.addEventListener('change', (p) => {
                  this.subDis_id = Number((p.target as HTMLInputElement).value)
                })

              }
            })
          }
        })
      }
    }
  }
  async selectShipping(value: any) {
    if(value){
      $("#province_sp").removeClass('closeSelect')
      $("#province_sp").addClass('openSelect')
      let sectot_id = value
      const getProvince = await this.authen.getProvince(sectot_id).toPromise()
      if(getProvince){
        this.isProvince = getProvince
        let province = document.getElementById('province_sp')
        province.addEventListener('change', async ($event) => {
        this.province_id_sp = Number(($event.target as HTMLInputElement).value)

          $("#district_sp").removeClass('closeSelect')
          $("#district_sp").addClass('openSelect')

          let get_district = await this.authen.getDistrict(this.province_id_sp).toPromise()
          if(get_district){
            this.isDistrict = get_district
            let subDistrict = document.getElementById('district_sp')
            subDistrict.addEventListener('change', async (p) => {
              let district_id = (p.target as HTMLInputElement).value
              let subDis = await this.authen.getSubDistrict(Number(district_id)).toPromise()
              if(subDis){
                this.isSubDistrict = subDis
                $("#subDistrict_sp").removeClass('closeSelect')
                $("#subDistrict_sp").addClass('openSelect')
                let tambol = document.getElementById('subDistrict_sp')
                tambol.addEventListener('change', (p) => {
                  this.subDis_id_sp = Number((p.target as HTMLInputElement).value)
                })

              }
            })
          }
        })
      }
    }
  }
  getSecTor() {
    const sub = this.authen.getSector().subscribe(
      result => {
        this.isSector = result
      },
      err => {
        console.log(err);

      },
      () => {
        sub.unsubscribe()
      }
    )
  }
  async createCustomers(item: CustomersFormCreate) {
    this.isLoadding = true
    const subDis: any = await this.authen.getSubDistrictById(this.subDis_id).toPromise()
    const provine: any = await this.authen.getProvinceById(this.province_id).toPromise()
    const subDis_sp: any = await this.authen.getSubDistrictById(this.subDis_id_sp).toPromise()
    const provine_sp: any = await this.authen.getProvinceById(this.province_id_sp).toPromise()

    $('.form-control').removeClass('is-valid')
    if(subDis || provine || subDis_sp || provine_sp) {

      const data = {
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        username: item.username,
        password: item.password,

        company_bl: item.company_bl,
        address_1_bl: item.address_1_bl,
        address_2_bl: item.address_2_bl,
        city_bl: subDis.name_th,
        state_bl: provine.name_th,
        postcode_bl: subDis.zip_code,
        country_bl: 'TH',
        email_bl: item.email_bl,
        phone_bl: item.phone_bl,

        company_sp: item.company_sp,
        address_1_sp: item.address_1_sp,
        address_2_sp: item.address_2_sp,
        city_sp: subDis_sp.name_th,
        state_sp: provine_sp.name_th,
        postcode_sp: subDis_sp.zip_code,
        country_sp: 'TH',
        email_sp: item.email_sp,
        phone_sp: item.phone_sp,

      }

      const sub = this.userSrevice.createCustomer(data).subscribe(
        async result => {
          console.log(result);
          await this.swal.alert('success', 'สมัครสมาชิกสำเร็จ')
          this.isLoadding = false
          this.route.navigate(['/authen/login'])
        },
        err => {
          this.isLoadding = false
          this.swal.alert('error', err.message, 5000)
          console.log('error createCustomer: ', err.message);
        },
        () => {
          sub.unsubscribe()
        }
      );
    }
    else{
      this.isLoadding = false
      this.swal.alert('error', 'กรุณากรอกที่อยู่ให้ครบ')
    }
  }
  onSubmit(value: CustomersFormCreate) {
      this.createCustomers(value);
  }
  validateForm(value: Customers) {
    $('#username').removeClass('is-invalid');
    $('.form-control').removeClass('is-invalid');
    if (value.username.length <= 7 || !value.username) {
      $('#username').addClass('is-invalid');
      this.swal.alert('warning', 'username is null OR username length 8');
    }
    if (value.username.length > 7) {
      $('#username').addClass('is-valid');
    }
    if (value.password.length <= 7 || !value.password) {
      $('#password').addClass('is-invalid');
      this.swal.alert('warning', 'password is null OR pasword length 8');
    }
    if (value.password.length > 7) {
      $('#password').addClass('is-valid');
    }
    if (value.email.length <= 7 || !value.email) {
      $('#email').addClass('is-invalid');
      this.swal.alert('warning', 'email is null OR email length 8');
    }
    if (value.email.length > 7) {
      $('#email').addClass('is-valid');
    }
    if (value.first_name.length <= 4 || !value.first_name) {
      $('#firstname').addClass('is-invalid');
      this.swal.alert('warning', 'firstname is null OR firstname length 8');
    }
    if (value.first_name.length > 4) {
      $('#firstname').addClass('is-valid');
    }
    if (value.last_name.length <= 4 || !value.last_name) {
      $('#lastname').addClass('is-invalid');
      this.swal.alert('warning', 'lastname is null OR lastname length 8');
    }
    if (value.last_name.length > 4) {
      $('#lastname').addClass('is-valid');
    }
  }
  inputBranch(event: Event) {
    const chekEL = event.target as HTMLInputElement;
    console.log(chekEL.value);
    let branch = chekEL.value;
    this.branchArray.push(Number(branch));
    console.log(this.branchArray);
  }
  slideToggle() {
    $('#slide_branch').slideToggle();
  }
  async validateUsername() {
    let username = document.getElementById('username') as HTMLInputElement
    try {
      const result = await firstValueFrom(this.userSrevice.findUsername(username.value))
      console.log(result);
      const p = document.getElementById('validUsername')
      const p2 = document.getElementById('invalidUsername')
      
      if(!result){
        p2.innerHTML = ''
        p.innerHTML = `
          <p style="color: green;">* สามารถใช่ username นี่ได้</p>
        `
      }
      else{
        p.innerHTML = ''
        p2.innerHTML = `
          <p style="color: red; ">* 'ไม่'สามารถใช่ username นี่ได้</p>
        `
      }
    } catch (error) {
      console.log(error);       
      this.swal.alert('error', error)
    }
  }
  async validateEmail() {
    let email = document.getElementById('email') as HTMLInputElement
    try {
      const result = await firstValueFrom(this.userSrevice.findEmail(email.value))
      console.log({
        result: result
      });
      const p = document.getElementById('validEmail')
      const p2 = document.getElementById('invalidEmail')
      
      if(!result){
        p2.innerHTML = ''
        p.innerHTML = `
          <p style="color: green;">* สามารถใช่ email นี่ได้</p>
        `
      }
      else{
        p.innerHTML = ''
        p2.innerHTML = `
          <p style="color: red; ">* 'ไม่'สามารถใช่ email นี่ได้</p>
        `
      }
    } catch (error) {
      console.log(error);       
      this.swal.alert('error', error)
    }
  }
  async validateEmailBl() {
    let email = document.getElementById('email') as HTMLInputElement
    try {
      const result = await firstValueFrom(this.userSrevice.findEmail(email.value))
      console.log({
        result: result
      });
      const p = document.getElementById('validEmailBl')
      const p2 = document.getElementById('invalidEmailBl')
      
      if(!result){
        p2.innerHTML = ''
        p.innerHTML = `
          <p style="color: green;">* สามารถใช่ email นี่ได้</p>
        `
      }
      else{
        p.innerHTML = ''
        p2.innerHTML = `
          <p style="color: red; ">* 'ไม่'สามารถใช่ email นี่ได้</p>
        `
      }
    } catch (error) {
      console.log(error);       
      this.swal.alert('error', error)
    }
  }
  async validateEmailSp() {
    let email = document.getElementById('email') as HTMLInputElement
    try {
      const result = await firstValueFrom(this.userSrevice.findEmail(email.value))
      console.log({
        result: result
      });
      const p = document.getElementById('validEmailSp')
      const p2 = document.getElementById('invalidEmailSp')
      
      if(!result){
        p2.innerHTML = ''
        p.innerHTML = `
          <p style="color: green;">* สามารถใช่ email นี่ได้</p>
        `
      }
      else{
        p.innerHTML = ''
        p2.innerHTML = `
          <p style="color: red; ">* 'ไม่'สามารถใช่ email นี่ได้</p>
        `
      }
    } catch (error) {
      console.log(error);       
      this.swal.alert('error', error)
    }
  }
}
