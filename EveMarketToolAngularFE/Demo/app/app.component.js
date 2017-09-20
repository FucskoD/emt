"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var orders_service_1 = require("./orders/orders.service");
require("rxjs/add/operator/map");
var AppComponent = (function () {
    function AppComponent(_orders) {
        this._orders = _orders;
        this.appTitle = 'Welcome';
        this.appStatus = true;
        this.appList = [
            {
                'ID': '1',
                'Name': 'One'
            },
            {
                'ID': '2',
                'Name': 'Two'
            }
        ];
    }
    AppComponent.prototype.clicked = function (event) {
        this.appStatus ? this.appStatus = false : this.appStatus = true;
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._orders.getorders()
            .subscribe(function (iorders) { return _this.iorders = iorders; });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/app/app.component.html',
        providers: [orders_service_1.OrdersService]
    }),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map