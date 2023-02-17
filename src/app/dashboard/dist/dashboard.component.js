"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(productService, fb, primengConfig) {
        this.productService = productService;
        this.fb = fb;
        this.primengConfig = primengConfig;
        this.tempData = [];
        this.closeResult = '';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.primengConfig.ripple = true;
        this.getProducst();
        this.addProductForm = this.fb.group({
            productid: ['', [forms_1.Validators.required]],
            productname: ['', [forms_1.Validators.required]],
            units: ['', [forms_1.Validators.required]],
            category: ['', [forms_1.Validators.required]],
            description: ['', [forms_1.Validators.required]]
        });
    };
    DashboardComponent.prototype.showModalDialog = function () {
        this.displayModal = true;
    };
    DashboardComponent.prototype.showBasicDialog = function () {
        this.displayBasic = true;
    };
    DashboardComponent.prototype.showBasicDialog2 = function () {
        this.displayBasic2 = true;
    };
    DashboardComponent.prototype.showMaximizableDialog = function () {
        this.displayMaximizable = true;
    };
    DashboardComponent.prototype.showPositionDialog = function (position) {
        this.position = position;
        this.displayPosition = true;
    };
    DashboardComponent.prototype.getProducst = function () {
        var _this = this;
        this.productService.getAllProducts().subscribe(function (data) {
            console.log(data);
            _this.tempData = data;
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css'],
            encapsulation: core_1.ViewEncapsulation.Emulated
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=dashboard.component.js.map
