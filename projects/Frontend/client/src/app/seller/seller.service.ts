import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppUser } from '../shared/models/IAppUser';
import { IUser } from '../shared/models/user';
import { shopParams } from '../shared/models/shopParams';
import { map, delay } from 'rxjs/operators';
import { IPagination } from '../shared/models/pagination';
import { Color } from '../shared/models/Color';
import { Size } from '../shared/models/Size';
import { SubCategory } from '../shared/models/subCategory';
import { IProduct } from '../shared/models/IProduct';
import { AppUser } from '../shared/models/appUser';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  currentUser$!: Observable<IUser | null>;
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getColors() {
    return this.http.get<Color[]>(this.baseUrl + 'Color');
  }

  getSizes() {
    return this.http.get<Size[]>(this.baseUrl + 'Size');
  }

  getSubCategory() {
    return this.http.get<SubCategory[]>(this.baseUrl + 'SubCategory');
  }

  editseller(id: any, seller: AppUser) {
    id = localStorage.getItem('userId');
    return this.http.put(this.baseUrl + 'AppUser?Id=' + id, seller);
  }
  postNewProduct(product: Product) {
    console.log('hello');

    return this.http.post(this.baseUrl + 'Product', product);
  }

  // uploadImage(files: any) {

  //   let fileToUpload = <File>files;
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append(files[i].name, files[i])
  //   }
  //   return this.http.post(this.baseUrl + 'Image', formData, { reportProgress: true, observe: 'events' });

  // }

  getUser(userId: any) {
    return this.http.get<IAppUser>(
      this.baseUrl + 'AppUser/GetAppUserByUserId?AppUserId=' + userId.toString()
    );
  }
  getProducts(shopParams: shopParams) {
    let params = new HttpParams();

    if (shopParams.sellerId && shopParams.sellerId !== 0) {
      params = params.append('SellerId', shopParams.sellerId.toString());
    }

    return this.http
      .get<IPagination>(this.baseUrl + 'product/GetProducts', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getAllOrders(sellerId: any) {
    return this.http.get(
      this.baseUrl + 'Order/GetBySellerId?SellerId=' + sellerId
    );
  }

  getCurrentSeller() {
    let id = localStorage.getItem('userId');
    return this.http.get<IAppUser>(
      this.baseUrl + 'AppUser/GetAppUserByUserId?AppUserId=' + id
    );
  }
  editSeller(id: any, seller: AppUser) {
    return this.http.put('http://localhost:52437/Api/AppUser?Id=' + id, seller);
  }

  EditOrder(id: any, order: any = {}) {
    return this.http.put(this.baseUrl + 'Order?Id=' + id, order);
  }
  editAdress(id: any, address: any) {
    return this.http.put(
      'http://localhost:52437/Api/Address?id=' + id,
      address
    );
  }
}
