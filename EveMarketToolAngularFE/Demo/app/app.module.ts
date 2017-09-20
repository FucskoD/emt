import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import {JsonpModule}     from '@angular/http';
import { AgGridModule }  from 'ag-grid-angular/main';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, 
                AgGridModule.withComponents([]
                ),JsonpModule
              ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
