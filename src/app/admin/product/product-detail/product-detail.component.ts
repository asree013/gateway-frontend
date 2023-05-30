import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  detailProduct = {} as Products
  noImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0JkN3XIguQOKFCv_nwx0D_3jLUUja45nYaJaQbY&s';
  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProductService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      let id = Number(param['id'])
      console.log(id);
      this.service.getProductOne(id).subscribe((result) => {
        this.detailProduct = result;
      });
    });
  }

}
