import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/service/stock.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  product: any;
  updateId: any;
  successMessage: string = "";
  errMessage: string = "";
  addProductForm: FormGroup;
  constructor(private productService: StockService, public fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute) {
    this.updateId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productid: ['', [Validators.required]],
      productname: ['', [Validators.required]],
      units: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.editProduct();
  }

  editProduct() {
    if (this.updateId) {
console.log(this.updateId);
    }
  }

  addProduct() {
    if (this.addProductForm.valid) {
      console.log(this.addProductForm.value);
      this.productService.addProduct(this.addProductForm.value).subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.errMessage = "";
          this.messageService.add({ severity: 'success', summary: 'Product successfully added to the catalog', detail: 'Via MessageService' });

          // this.successMessage = "Product successfully added to the catalog";
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Product could not be Added to the catalog : Check Specification of your product', detail: 'Via MessageService' });

          this.successMessage = "";
          // this.errMessage = "Product could not be Added to the catalog : Check Specification of your product";
        }

      })
    }



  }


}
