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
var notificaton_type_enum_1 = require("../enum/notificaton-type.enum");
var PeopleComponent = /** @class */ (function () {
    function PeopleComponent(authenticationService, fb, peopleService, notificationService) {
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.peopleService = peopleService;
        this.notificationService = notificationService;
        this.peoplsDialog = false;
        this.subscriptions = [];
        this.submitted = false;
        this.roles = [
            { name: 'accounts', code: 'accounts' },
            { name: 'admini', code: 'admini' },
            { name: 'human resourse', code: 'human resourse' },
        ];
    }
    PeopleComponent.prototype.ngOnInit = function () {
        this.getUsers(true);
        this.userForm = this.fb.group({
            firstName: ['', [forms_1.Validators.required]],
            lastName: ['', [forms_1.Validators.required]],
            Username: ['', [forms_1.Validators.required]],
            Email: ['', [forms_1.Validators.required]],
            Role: ['', [forms_1.Validators.required]]
        });
        //this.productService.getAllProducts().subscribe(data => this.products = data);
    };
    Object.defineProperty(PeopleComponent.prototype, "f", {
        get: function () {
            return this.userForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    PeopleComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }
        console.log(this.userForm.value);
        this.authenticationService.register(this.userForm.value).subscribe(function (data) {
            console.log(data);
        });
    };
    PeopleComponent.prototype.getUsers = function (showNotification) {
        var _this = this;
        this.refreshing = true;
        this.subscriptions.push(this.peopleService.getUsers().subscribe(function (response) {
            _this.peopleService.addUsersToLocalCache(response);
            _this.users = response;
            _this.refreshing = false;
            if (showNotification) {
                _this.sendNotification(notificaton_type_enum_1.NotificationType.SUCCESS, response.length + " user(s) loaded successfully.");
            }
        }, function (errorResponse) {
            _this.sendNotification(notificaton_type_enum_1.NotificationType.ERROR, errorResponse.error.message);
            _this.refreshing = false;
        }));
    };
    PeopleComponent.prototype.searchUser = function () { };
    PeopleComponent.prototype.onProfileImageChange = function (event) {
        console.log(event);
    };
    PeopleComponent.prototype.onSelectUser = function (selectedUser) {
        var _a;
        this['selectedUser'] = selectedUser;
        (_a = document.getElementById('openUserInfo')) === null || _a === void 0 ? void 0 : _a.click();
    };
    PeopleComponent.prototype.onAddNewUser = function (userForm) {
        // const formData = this.peopleService.createUserFormDate(null, userForm.value, this.profileImage);
        // this.subscriptions.push(
        //   this.peopleService.addUser(formData).subscribe(
        //     (Response: User) => {
        //     },
        //   ));
    };
    PeopleComponent.prototype.sendNotification = function (notificationType, message) {
        if (message) {
            this.notificationService.notify(notificationType, message);
        }
        else {
            this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
        }
    };
    PeopleComponent.prototype.openNew = function () {
        this.peoplsDialog = true;
    };
    PeopleComponent.prototype.changeTitle = function () {
    };
    PeopleComponent = __decorate([
        core_1.Component({
            selector: 'app-people',
            templateUrl: './people.component.html',
            styleUrls: ['./people.component.css']
        })
    ], PeopleComponent);
    return PeopleComponent;
}());
exports.PeopleComponent = PeopleComponent;

//# sourceMappingURL=people.component.js.map
