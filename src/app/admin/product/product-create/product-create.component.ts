import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private service: ProductService,
    private swal: AlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  async onCreateProduct(item: Products) {
    if(!item.name) await this.swal.alert('warning', 'กรุณากรอกข้อมูล Name')
    else if(!item.slug) await this.swal.alert('warning', 'กรุณากรอกข้อมูล slug')
    else if(!item.status) await this.swal.alert('warning', 'กรุณากรอกข้อมูล status')
    else if(!item.price) await this.swal.alert('warning', 'กรุณากรอกข้อมูล price')
    else if(!item.regular_price) await this.swal.alert('warning', 'กรุณากรอกข้อมูล regular_price')
    else if(!item.sale_price) await this.swal.alert('warning', 'กรุณากรอกข้อมูล sale_price')
    else {
      this.service.addProduct(item).subscribe(
        result => {
          this.swal.alert('success', `เพิ่ม ${item.name} ในฐานข้อมูลเรียบร้อย!!!`)
          this.router.navigate(['product/admin'])
        },
        err => {
          this.swal.alert('warning', JSON.stringify(`เกิดข้อผิดผล้าดในการเพิ่มข้อมูล!!!! errorMessage: ${err.message}`), 3000)
        }
      )
    }
  }

}
