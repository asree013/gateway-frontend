import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BranchCreateForUser, SearchBranch } from 'src/app/models/class/branch.model';
import { Users } from 'src/app/models/class/users.model';
import { AlertService } from 'src/app/services/alert.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input("data") obj: SearchBranch = {} as SearchBranch
  @Output("close") close = new EventEmitter
  noImage: string = environment.noImgae
  searched: Users[] = []
  isLoading: boolean

  constructor(
    private readonly us: UsersService,
    private readonly swal: AlertService,
  ) { }

  ngOnInit(): void {
  }

  serachData(event: Event) {
    this.isLoading = true
    const email = (event.target as HTMLInputElement).value
    const sub = this.us.findUserByEmial(email.toLocaleLowerCase()).subscribe(
      result => {
        this.searched = result    
        this.isLoading = false
      },
      err => {
        this.swal.alert('error', "ไม่มี Email นี้ในระบบ")  
        this.isLoading = false
      },
      () => {
        sub.unsubscribe()
      }
    )
  }

  addBranch(id: number) {
    this.isLoading = true
    if(id){
      const add = new BranchCreateForUser()
      add.branch_id = this.obj.branch_id
      add.user_id = id
      add.role = 0
      const sub = this.us.createBranchForUser(add).subscribe(
        result => {
          this.isLoading = false
          this.us.findBranchByBranchId(this.obj.branch_id).toPromise()
          this.swal.alert('success', 'Join Warehouse Complete')
        },
        err => {
          console.log(err);
          this.isLoading = false
          this.swal.alert('error', JSON.stringify(err))
        },
        () => {
          sub.unsubscribe()
        }
      )
    }
  }

}
