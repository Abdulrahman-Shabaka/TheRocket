import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, PaginationModule } from 'ngx-bootstrap';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagerComponent } from './components/pager/pager.component';




@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,

  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule.forRoot()


  ],
  exports: [PaginationModule,
    PagingHeaderComponent,
    ReactiveFormsModule,
    PagerComponent,
    CarouselModule]
})
export class SharedModule { }
