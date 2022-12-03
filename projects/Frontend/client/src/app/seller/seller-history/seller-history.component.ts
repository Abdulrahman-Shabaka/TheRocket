import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IAppUser } from 'src/app/shared/models/IAppUser';
import { IUser } from 'src/app/shared/models/user';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller-history',
  templateUrl: './seller-history.component.html',
  styleUrls: ['./seller-history.component.scss']
})
export class SellerHistoryComponent {
  x = 0;
  appUser!: IAppUser;
  currentUser!: IUser | null;
  id!: any;

  BuyerID:any;
  Adresses:any 
  phone:any
  sellerId: any
  orders: any;
  constructor(
    private accountService: AccountService,
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.accountService.currentUser$
      .pipe(filter((res) => res != null))
      .subscribe((res) => {
        this.id = res?.userId;
        this.getUser();


      });
  }


  getUser() {
    return this.sellerService.getUser(this.id).subscribe(
      (response) => {
        this.appUser = response;
        console.log(this.appUser.seller?.sellerId);
        this.sellerId = this.appUser.seller?.sellerId;
        this.sellerService.getAllOrders(this.sellerId).subscribe(
          (response) => {

            this.orders = response;
            console.log(this.orders);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrders() {
    this.getUser();
    return this.sellerService.getAllOrders(this.sellerId).subscribe(
      (response) => {

        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  test(BuyerID:number){
    this.sellerService.getBuyerData(BuyerID).subscribe(
      data=>{
      this.Adresses=data;
      console.log(this.Adresses);
        alert('Adresses:\n'+this.Adresses.addresses[0].government+'\n'+this.Adresses.addresses[0].city+
        '\nPhones: '+this.Adresses.phones[0].phone);
      },
      error=>{
        console.log(error);
      }

    );
  }

}
