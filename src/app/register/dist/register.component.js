"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var notificaton_type_enum_1 = require("../enum/notificaton-type.enum");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, authenticationService, notificationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.notificationService = notificationService;
        this.subscriptions = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        if (this.authenticationService.isUserLoggedIn()) {
            this.router.navigateByUrl('/user');
        }
    };
    RegisterComponent.prototype.onRegister = function (user) {
        var _this = this;
        this.showLoading = true;
        this.subscriptions.push(this.authenticationService.register(user).subscribe({
            next: function (response) {
                _this.showLoading = false;
                _this.sendNotification(notificaton_type_enum_1.NotificationType.SUCCESS, "A new account was created for " + response.firstName + ".\n          Please check your email for password to log in.");
            },
            error: function (errorResponse) {
                _this.sendNotification(notificaton_type_enum_1.NotificationType.ERROR, errorResponse.error.message);
                _this.showLoading = false;
            }
        }));
    };
    RegisterComponent.prototype.sendNotification = function (notificationType, message) {
        if (message) {
            this.notificationService.notify(notificationType, message);
        }
        else {
            this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
        }
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;

//# sourceMappingURL=register.component.js.map
