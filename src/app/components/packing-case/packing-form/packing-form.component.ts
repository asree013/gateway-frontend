import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DetailPacking, PackingCase, PackingCaseDetail } from 'src/app/models/class/packing-case';
import { Search } from 'src/app/models/class/searh.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { PackingCaseService } from 'src/app/services/packing-case.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { NIL as NIL_UUID} from 'uuid'

export interface carts { pack: string, pack_count: string, product_id: number}
@Component({
  selector: 'app-packing-form',
  templateUrl: './packing-form.component.html',
  styleUrls: ['./packing-form.component.css']
})
export class PackingFormComponent implements OnInit {

  constructor(
    private readonly activate: ActivatedRoute,
    private readonly Ps: ProductService,
    private readonly swal: AlertService,
    private readonly pcs: PackingCaseService,
    private readonly router: Router
  ) { }
  product: Products[] = []
  packing: PackingCase = {} as PackingCase
  packingDetail: Products[] = []
  form: boolean
  noImg: string = environment.noImgae
  checkValidate: boolean

  ngOnInit(): void {
    this.getParam()
  }
  async getParam(){
    const param = await firstValueFrom(this.activate.params)  
    NIL_UUID === param['id']
    if(NIL_UUID === param['id']){
      this.form = false
      
    }
    else{
      this.form = true
    }
    
  }
  async searchProduct(){
    const value = (document.getElementById("searchProduct") as HTMLInputElement).value
    const search = {
      data: {
        sku: value
      }
    }
    try {
      const result = await firstValueFrom(this.Ps.search(search))
      if(result){
        this.product = result
        let search = (document.getElementById("searchProduct") as HTMLInputElement)
        search.value = ""
      }
      
    } catch (error) {
      console.log(error);
    }
    
  }
  addItemPackingCase(value: Products) {
    const findProduct = this.packingDetail.find(r => r.id === value.id)
    if(!findProduct) {
      this.packingDetail.push(value)
      console.log(this.packingDetail);
      
    }
    else{
      this.swal.alert('error', 'have a product in cart')
    }
    
  }
  async createPackin() {
    const findValue = this.packingDetail.map((r, i) => {
      const pack = (document.getElementById(`pack${i}`) as HTMLInputElement)
      const pack_count = (document.getElementById(`pack_count${i}`) as HTMLInputElement)
      const image = (document.getElementById(`image${i}`) as HTMLInputElement)
      image.classList.remove('red')
      image.classList.remove('green')
      if(pack.value.length < 1 || pack_count.value.length < 1){
        image.classList.add('red')
        image.classList.add('red')
        this.swal.alert('error', 'กรุณาใส่จำนวน')
        this.checkValidate = false
        return undefined
      }
      else{
        image.classList.remove('green')
        image.classList.remove('green')
        this.checkValidate = true
        return {
          pack: pack.value,
          pack_count: pack_count.value,
          product_id: r.id
        }
      }
      
    })
    
    if(this.checkValidate){
      try {
        const packing = {} as PackingCase
        packing.names = `${this.packing.names} ${(localStorage.getItem('branch_title'))}`
        packing.counts = this.packing.counts
        packing.images = this.packing.images
        packing.pc_sku = this.packing.pc_sku
        const create = await firstValueFrom(this.pcs.createPackingCase(packing))
        
        const packingDetail = {} as PackingCaseDetail
        const detail = findValue.map(async (r: any)=> {
          packingDetail.count_product_pack = r.pack
          packingDetail.count_product_item = r.pack_count
          packingDetail.product_id = r.product_id
          packingDetail.pc_id = create.id
          const createDetail = await firstValueFrom(this.pcs.createPackingCaseDetail(packingDetail))
          return createDetail
        })
        if(detail){
          this.router.navigate(['/packing'])
        }
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
    
  }

}
