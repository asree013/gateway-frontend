import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NIL as uuid} from 'uuid'

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToPacking(){
    const id = uuid
    this.router.navigate([`/packing/${id}`])
  }

}
