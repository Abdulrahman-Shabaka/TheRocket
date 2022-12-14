import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/IProduct';
import { shopParams } from '../shared/models/shopParams';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTermVC!: ElementRef;
  products: IProduct[] | undefined = [];
  shopParams = new shopParams();
  totalCount: number = 0;
  sortOptions = [
    { name: 'Alphabetical', value: 'Name' },
    { name: 'Price', value: 'Price' },
    { name: 'Brand', value: 'Brand' },
    { name: 'Seller', value: 'SellerId' },
    { name: 'Category', value: 'subCategoryId' },
  ];
  orderOptions = [
    { name: 'Ascending', value: 'asc' },
    { name: 'Descending', value: 'desc' },
  ];
  categoryOptions = [
    { name: 'All', value: '' },
    { name: 'Men', value: 'Men' },
    { name: 'Women', value: 'Woman' },
    { name: 'Children', value: 'Childreen' }

  ];
  subCategoryOptions = [
    { name: 'All', value: '' },
    { name: 'Clothes', value: 'clothes' },
    { name: 'Shoes', value: 'shoes' },
    { name: 'Accessories', value: 'Accessories' }
  ];



  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response!.products;
        this.totalCount = response!.productMatchCount;
      },
      (error) => { console.log(error) });
  }

  onSearch() {
    this.shopParams.searchTerm = this.searchTermVC.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTermVC.nativeElement.value = '';
    this.shopParams = new shopParams();
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sortBy = sort;
    this.getProducts();
  }

  onOrderSelected(order: string) {

    this.shopParams.sortOrder = order;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onCategorySelected(value: string) {
    this.shopParams.mainCategory = value;
    this.getProducts();
  }

  onSubCategorySelected(value: string) {
    this.shopParams.subCategory = value;
    this.getProducts();

  }

}
