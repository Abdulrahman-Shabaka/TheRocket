import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    SellerComponent,
    
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule
  ],
  exports: [SellerComponent]
})
export class SellerModule { }
