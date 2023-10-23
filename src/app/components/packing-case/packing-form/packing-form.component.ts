import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DetailPacking, PackingCase, PackingCaseDetail } from 'src/app/models/class/packing-case';
import { Search } from 'src/app/models/class/searh.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { NIL as NIL_UUID} from 'uuid'

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
  ) { }
  product: Products[] = []
  packing: PackingCase = {} as PackingCase
  packingDetail: Products[] = []
  form: boolean
  noImg: string = environment.noImgae

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
  createPackin() {
    const findValue = this.packingDetail.map((r, i) => {
      const pack = (document.getElementById(`pack${i}`) as HTMLInputElement)
      const pack_count = (document.getElementById(`pack_count${i}`) as HTMLInputElement)
      pack_count.classList.remove('red')
      pack.classList.remove('red')
      if(pack.value.length < 1 && pack_count.value.length < 1){
        pack.classList.add('red')
        pack_count.classList.add('red')
        this.swal.alert('error', 'กรุณาใส่จำนวน')
        return null
      }
      else{
        return {
          pack: pack.value,
          pack_count: pack_count.value,
          product_id: r.id
        }
      }
      
    })
    
    if(findValue){
      try {
        const packing = {} as PackingCase
        packing.names = this.packing.names
        packing.counts = this.packing.counts
        packing.images = this.packing.images
        packing.pc_sku = this.packing.pc_sku
        packing.id = 23
        
        const packingDetail = {} as PackingCaseDetail
        findValue.map((r: any)=> {
          packingDetail.count_product_pack = r.pack
          packingDetail.count_product_item = r.pack_count
          packingDetail.product_id = r.product_id
          packingDetail.pc_id = packing.id
          return console.log('create', packingDetail)
          
        })
        
      } catch (error) {
        console.log(error);
        
      }
    }
    
  }

}
