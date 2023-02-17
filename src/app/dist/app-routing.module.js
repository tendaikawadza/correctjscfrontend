"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var stockrequest_component_1 = require("./stockrequest/stockrequest.component");
var register_component_1 = require("./register/register.component");
var user_component_1 = require("./user/user.component");
var stock_component_1 = require("./stock/stock/stock.component");
var people_component_1 = require("./people/people.component");
var authentication_guard_1 = require("./guard/authentication.guard");
var stockdashboard_component_1 = require("./stockdashboard/stockdashboard.component");
var purchase_requast_admin_component_1 = require("./purchase-requast-admin/purchase-requast-admin.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'purchase', component: purchase_requast_admin_component_1.PurchaseRequastAdminComponent },
    { path: 'stockrequest', component: stockrequest_component_1.StockrequestComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'stock', component: stock_component_1.StockComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'user/management', component: user_component_1.UserComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'people', component: people_component_1.PeopleComponent, canActivate: [authentication_guard_1.AuthenticationGuard] },
    { path: 'Dashboard', component: stockdashboard_component_1.StockdashboardComponent },
    { path: 'stock/:id', component: stock_component_1.StockComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [stock_component_1.StockComponent, people_component_1.PeopleComponent];

//# sourceMappingURL=app-routing.module.js.map
