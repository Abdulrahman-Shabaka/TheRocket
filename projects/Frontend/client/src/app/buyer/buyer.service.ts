import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { shopParams } from '../shared/models/shopParams';
import { map, delay } from 'rxjs/operators';
import { IPagination } from '../shared/models/pagination';
import { environment } from 'src/environments/environment';
import { idLocale } from 'ngx-bootstrap';
import { __values } from 'tslib';
import { ThrowStmt } from '@angular/compiler';
import { IAppUser } from '../shared/models/IAppUser';
import { IOrder } from '../shared/models/order';
import { Buyer } from '../shared/models/buyer';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class buyerService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  getCurrentBuyer() {
    let id = localStorage.getItem('userId');
    return this.http.get<IAppUser>(this.baseUrl + "AppUser/GetAppUserByUserId?AppUserId=" + id);
  }

  editbuyer(id: any, buyer: any) {
     id = localStorage.getItem('userId');
     return this.http.put("http://localhost:52437/Api/AppUser?Id=" + id, buyer);
  }
  getAllOrdersByBuyerId(BuyerId: number) {
    let id = BuyerId.toString();
    return this.http.get<IOrder[]>("http://localhost:52437/api/Order/GetByBuyerId?BuyerId=" + id);
  }
  getCurrentBuyerAppUser(){
    let id = localStorage.getItem('userId');
    return this.http.get<IAppUser>(this.baseUrl + 'AppUser/GetAppUserByUserId?AppUserId=' + id);
  }
  editAddressbuyer(id: any, address: any) {
    id = localStorage.getItem('userId');
    return this.http.put("http://localhost:52437/Api/Address?id=" + id, address);
 }
}