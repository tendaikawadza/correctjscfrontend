import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { StockService } from '../service/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DashboardComponent implements OnInit {
tempData:any[] = []; 
style: any;
closeResult = '';
addProductForm:FormGroup;
displayModal: boolean;

  displayBasic: boolean;

  displayBasic2: boolean;

  displayMaximizable: boolean;

  displayPosition: boolean;

  position: string;
  constructor(private productService: StockService, private fb:FormBuilder,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getProducst();
    this.addProductForm = this.fb.group({
      productid: ['', [Validators.required]],
      productname: ['', [Validators.required]],
      units: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      });
  }
  



  showModalDialog() {
      this.displayModal = true;
  }

  showBasicDialog() {
      this.displayBasic = true;
  }

  showBasicDialog2() {
      this.displayBasic2 = true;
  }

  showMaximizableDialog() {
      this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
      this.position = position;
      this.displayPosition = true;
  }
  getProducst(){
    this.productService.getAllProducts().subscribe((data:any)=>{
      console.log(data);
      this.tempData =data;
    })
  }
 

}
