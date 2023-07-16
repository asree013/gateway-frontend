import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Images, Products } from 'src/app/models/interface/woocommerce.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  productId = 0
  detailProduct = {} as Products
  noImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0JkN3XIguQOKFCv_nwx0D_3jLUUja45nYaJaQbY&s';

    form: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProductService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.productId = Number(param['id'])
      this.service.getProductOne(this.productId).subscribe((result) => {
        this.detailProduct = result;
      });
    });
  }

  uploadImage(event: Event) {

    // this.service.uploadImage(file).subscribe(
    //   result => {
    //     console.log('result: ', result);

    //   },
    //   err => {
    //     console.log('err: ', err);

    //   }
    // )

    const target = event.target as HTMLInputElement;
    let files = target.files as FileList
    const formData = new FormData()
    formData.append('file', files[0])

    if(files){
      this.service.uploadImage(formData, this.productId).subscribe(
        result => {
          console.log("result: ", result);
        },
        err => {
          console.log(`err: ${err}`);
        }
      )

    }


  }

  // uploadFile(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({
  //     avatar: file,
  //   });
  //   this.form.get('avatar').updateValueAndValidity();
  // }
  // submitForm() {
  //   var formData: any = new FormData();
  //   formData.append('name', this.form.get('name').value);
  //   formData.append('avatar', this.form.get('avatar').value);
  //   // this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
  //   //   (response) => console.log(response),
  //   //   (error) => {
  //   //     console.log(error.message);
  //   //   }
  //   // );
  // }
}
