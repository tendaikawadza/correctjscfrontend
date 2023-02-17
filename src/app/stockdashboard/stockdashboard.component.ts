import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Stock } from '../model/stock';
import { AuthenticationService } from '../service/authentication.service';
import { StockService } from '../service/stock.service';

@Component({
    selector: 'app-stockdashboard',
    templateUrl: './stockdashboard.component.html',
    styleUrls: ['./stockdashboard.component.css']
})
export class StockdashboardComponent {
    items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'},
        {label: 'Logout', icon: 'pi pi-fw pi-power-off'},
      ];
    productDialog: boolean;

    products: Stock[] = [
        { productId: 11, productCode: 17, productName: "test", productDescription: "test", productCategory: "tets desc", quantityOnHand: 4 },
        { productId: 12, productCode: 155, productName: "test prod", productDescription: "test", productCategory: "tets desc", quantityOnHand: 5 },
        { productId: 13, productCode: 166, productName: "test test no", productDescription: "test", productCategory: "tets desc", quantityOnHand: 6 },
    ];
    categoryOpt = [
        { name: 'accounts', code: 'accounts' },
        { name: 'admini', code: 'admini' },
        { name: 'human resourse', code: 'human resourse' },

    ];

    product: any;

    selectedProducts: Stock[];

    submitted: boolean;
    addProductForm: FormGroup;

    constructor(private router:Router,private auth:AuthenticationService, private productService: StockService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private fb: FormBuilder) { }

    ngOnInit() {
        this.addProductForm = this.fb.group({
            productName: ['', [Validators.required]],
            productCode: ['', [Validators.required]],
            quantityOnHand: ['', [Validators.required]],
            productCategory: ['', [Validators.required]],
            productDescription: ['', [Validators.required]],
        });
        this.productService.getAllProducts().subscribe(data => this.products = data);
    }
    get f(): any {
        return this.addProductForm.controls;
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
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Stock) {
        this.addProductForm.patchValue(product);
        this.productDialog = true;
    }

    deleteProduct(product: Stock) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.productName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.productCode !== product.productCode);
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
        console.log(this.addProductForm.value)
        if (this.addProductForm.invalid) {
            return
        }
        this.submitted = true;
        this.productService.addProduct(this.addProductForm.value).subscribe((data: any) => {
            if (data) {
                this.products.push(this.addProductForm.value);
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
            if (this.products[i].productCode === id) {
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
    logout(){
        console.log('ddd')
      this.auth.logOut();
      this.router.navigate(['login']);
    }
}

