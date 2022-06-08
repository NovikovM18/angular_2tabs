import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public productList: Product[] = [];
  public selectedProduct: Product | any = {}
  public displayedRowsSecondTable: Array<any> = [];
  public show: boolean = false;
  private httpClient: HttpClient;
  
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  
  ngOnInit(): void {
    this.httpClient.get<Product[]>('https://raw.githubusercontent.com/KovalchukD/testTask/master/DATA.json')
    .subscribe((productList: Product[]) => {
      this.productList = productList;
    });
  };
  
  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.displayedRowsSecondTable = Object.entries(this.selectedProduct);
    this.displayedRowsSecondTable.map((el: Array<any>) => {
      if (el[1] === null) {
        el[1] = `it's unknown`;
      }
    });    
    this.show = true;
  }
  
  closer() {
    this.show = false;
  }
  
  displayedColumnsFirstTable: string[] = ['position', 'name'];
  displayedColumnsSecondTable: string[] = ['option', 'description'];
}
