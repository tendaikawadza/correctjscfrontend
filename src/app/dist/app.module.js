"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var auth_interceptor_1 = require("./interceptor/auth.interceptor");
var authentication_guard_1 = require("./guard/authentication.guard");
var notification_module_1 = require("./notification.module");
var notification_service_1 = require("./service/notification.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var user_component_1 = require("./user/user.component");
var stock_component_1 = require("./stock/stock/stock.component");
var stockrequest_component_1 = require("./stockrequest/stockrequest.component");
var user_service_service_1 = require("./user-service.service");
var stock_service_1 = require("./service/stock.service");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var navbar_component_1 = require("./navbar/navbar.component");
var footer_component_1 = require("./footer/footer.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var dialog_1 = require("primeng/dialog");
var button_1 = require("primeng/button");
var animations_1 = require("@angular/platform-browser/animations");
var toast_1 = require("primeng/toast");
var table_1 = require("primeng/table");
var calendar_1 = require("primeng/calendar");
var slider_1 = require("primeng/slider");
var multiselect_1 = require("primeng/multiselect");
var contextmenu_1 = require("primeng/contextmenu");
var dropdown_1 = require("primeng/dropdown");
var progressbar_1 = require("primeng/progressbar");
var inputtext_1 = require("primeng/inputtext");
var fileupload_1 = require("primeng/fileupload");
var toolbar_1 = require("primeng/toolbar");
var rating_1 = require("primeng/rating");
var radiobutton_1 = require("primeng/radiobutton");
var inputnumber_1 = require("primeng/inputnumber");
var confirmdialog_1 = require("primeng/confirmdialog");
var api_1 = require("primeng/api");
var api_2 = require("primeng/api");
var inputtextarea_1 = require("primeng/inputtextarea");
var stockdashboard_component_1 = require("./stockdashboard/stockdashboard.component");
var purchase_requast_admin_component_1 = require("./purchase-requast-admin/purchase-requast-admin.component");
var angular2_signaturepad_1 = require("angular2-signaturepad");
var menu_1 = require("primeng/menu");
var steps_1 = require("primeng/steps");
var card_1 = require("primeng/card");
var people_component_1 = require("./people/people.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                user_component_1.UserComponent,
                stock_component_1.StockComponent,
                stockrequest_component_1.StockrequestComponent,
                dashboard_component_1.DashboardComponent,
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                sidebar_component_1.SidebarComponent,
                stockdashboard_component_1.StockdashboardComponent,
                purchase_requast_admin_component_1.PurchaseRequastAdminComponent,
                people_component_1.PeopleComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                menu_1.MenuModule,
                card_1.CardModule,
                steps_1.StepsModule,
                app_routing_module_1.AppRoutingModule,
                angular2_signaturepad_1.SignaturePadModule,
                toast_1.ToastModule,
                router_1.RouterModule,
                http_1.HttpClientModule,
                notification_module_1.NotificationModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                dialog_1.DialogModule,
                button_1.ButtonModule,
                animations_1.BrowserAnimationsModule,
                table_1.TableModule,
                calendar_1.CalendarModule,
                slider_1.SliderModule,
                dialog_1.DialogModule,
                multiselect_1.MultiSelectModule,
                contextmenu_1.ContextMenuModule,
                dropdown_1.DropdownModule,
                toast_1.ToastModule,
                inputtext_1.InputTextModule,
                progressbar_1.ProgressBarModule,
                http_1.HttpClientModule,
                fileupload_1.FileUploadModule,
                toolbar_1.ToolbarModule,
                rating_1.RatingModule,
                forms_1.FormsModule,
                radiobutton_1.RadioButtonModule,
                inputnumber_1.InputNumberModule,
                confirmdialog_1.ConfirmDialogModule,
                inputtextarea_1.InputTextareaModule,
            ],
            exports: [table_1.TableModule],
            providers: [notification_service_1.NotificationService, stock_service_1.StockService, api_2.MessageService, authentication_guard_1.AuthenticationGuard, api_1.ConfirmationService, AuthenticatorResponse, user_service_service_1.UserServiceService,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
