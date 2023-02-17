"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var PeopleService = /** @class */ (function () {
    function PeopleService(http) {
        this.http = http;
        this.host = environment_1.environment.apiUrl;
    }
    PeopleService.prototype.getUsers = function () {
        return this.http.get(this.host + "/user/list");
    };
    PeopleService.prototype.addUser = function (formData) {
        return this.http.post(this.host + "/user/add", formData);
    };
    PeopleService.prototype.updateUser = function (formData) {
        return this.http.post(this.host + "/user/update", formData);
    };
    PeopleService.prototype.deleteUser = function (username) {
        return this.http["delete"](this.host + "/user/delete/" + username);
    };
    PeopleService.prototype.addUsersToLocalCache = function (users) {
        localStorage.setItem('users', JSON.stringify(users));
    };
    PeopleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PeopleService);
    return PeopleService;
}());
exports.PeopleService = PeopleService;

//# sourceMappingURL=people.service.js.map
