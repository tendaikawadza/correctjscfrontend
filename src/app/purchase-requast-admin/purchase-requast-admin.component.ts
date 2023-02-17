import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Stock } from '../model/stock';
import { StockService } from '../service/stock.service';
import { SignaturePad } from 'angular2-signaturepad';
@Component({
  selector: 'app-purchase-requast-admin',
  templateUrl: './purchase-requast-admin.component.html',
  styleUrls: ['./purchase-requast-admin.component.css']
})
export class PurchaseRequastAdminComponent implements OnInit {
  purchaseRequastForm: FormGroup;
  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 100
  };
  productDialog: boolean;

  products = [
    {
      productId: 11,
      productName: 'Computer',
      productDesc: 'High Config',
      purposeOfIssue:'damage',
      departCode: '002',
      requestingReport: 'Yes',
      itemDescription: 'Very High',
      datePreviousIssue: '01/04/2023',
      previousIssueQty: 5,
      estimatedValue: 55555533,
      empSign: 'sign',
      quanity: 5
    }
    ];
  categoryOpt = [
    { name: 'accounts', code: 'accounts' },
    { name: 'admini', code: 'admini' },
    { name: 'human resourse', code: 'human resourse' },

  ];

  product: any;

  selectedProducts: Stock[];

  submitted: boolean;

  constructor(private productService: StockService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.purchaseRequastForm = this.fb.group({
      productId: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      productDesc: ['', [Validators.required]],
      purposeOfIssue: ['', [Validators.required]],
      departCode: ['', [Validators.required]],
      requestingReport: ['', [Validators.required]],
      itemDescription: ['', [Validators.required]],
      datePreviousIssue: ['', [Validators.required]],
      previousIssueQty: ['', [Validators.required]],
      estimatedValue: ['', [Validators.required]],
      empSign: ['', [Validators.required]],
      quanity: ['', [Validators.required]]
    });
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }
  get f(): any {
    return this.purchaseRequastForm.controls;
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    console.log(this.signatureImg);
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.products = this.products.filter(val => !this.selectedProducts.includes('');
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Stock) {
    this.purchaseRequastForm.patchValue(product);
    this.productDialog = true;
  }

  deleteProduct(product: Stock) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.productName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.productId !== product.productId);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;   
    console.log(this.purchaseRequastForm.value)
   
    if (this.purchaseRequastForm.invalid) {
      return
    }
    this.products = [this.products, ...this.purchaseRequastForm.value];
   
    this.productService.addProduct(this.purchaseRequastForm.value).subscribe((data: any) => {
      if (data) {
        this.products.push(this.purchaseRequastForm.value);
        this.messageService.add({ severity: 'success', summary: 'Product successfully added to the catalog', detail: 'Via MessageService' });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Product could not be Added to the catalog : Check Specification of your product', detail: 'Via MessageService' });
      }

    })
    // if (this.product.productCode.trim()) {
    //     if (this.product.productCode) {
    //         this.products[this.findIndexById(this.product.productCode)] = this.product;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     }
    //     else {
    //         this.product.productCode = this.createId();

    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
    // }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productId === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

