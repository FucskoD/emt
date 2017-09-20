import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { IOrders } from './orders';

@Injectable ()
export class OrdersService{
    private _ordersurl = 'http://localhost:8082/orders/orders';
    public orders;
    constructor(private _http: Http){}

    getorders(): Observable <IOrders[]> {
        return this._http.get(this._ordersurl)
        .map((response: Response) => <IOrders[]> response.json())
        .do(data => console.log(JSON.stringify(data)));
    }
}