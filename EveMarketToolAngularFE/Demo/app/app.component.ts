import { Component }      from '@angular/core';
import { IOrders }        from './orders/orders';
import { OrdersService }  from './orders/orders.service';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { GridOptions }    from 'ag-grid/main';
import { IDatasource } from "ag-grid/src/ts/rowModels/iDataSource";
import {Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [OrdersService]
})
export class AppComponent {
  appTitle: string = 'Tool';
  appStatus: boolean = true;
  private dataSource: IDatasource;
  private dataSourceLines: IDatasource;
  private currentPage: number = 0;
  private currentPageLines: number = 0;
  private size: number = 1000;
  allOfTheData: IOrders[] = [];
  allOfTheDataLines: IOrders[] = [];
  private sortingParameters: string = "";
  private sortingParametersBefore: string="";
  private sortingParametersLines: string = "";
  private sortingParametersBeforeLines: string="";
  private maxNumber: number = 1;
  private maxNumberLines: number = 1;
  private url: string;
  private urlLines: string;
  clicked(event:MouseEvent){
    this.appStatus ? this.appStatus=false : this.appStatus = true;    
  }
  appList: any[] = [
    {
      'ID' : '1',
      'Name' : 'One'

    },
    {
      'ID' : '2',
      'Name': 'Two'
    }
  ];
  private gridOptions:GridOptions;
  private gridOptionsLines:GridOptions;
  public rowData:any[];
  private columnDefs:any[];

  iorders: IOrders[];
  constructor(private _orders: OrdersService, _http: Http){
    this.gridOptions = <GridOptions>{
      paginationPageSize: 1000,
      enableServerSideSorting: true,
      enableColResize: true,
      enableServerSideFilter: true,
      rowSelection: 'multiple',
      rowDeselectio: true,
      rowModelType: 'infinite',
      columnDefs: this.columnDefs,
      cacheBlockSize: 999,
      infiniteInitialRowCount: 1000,      
      defaultColDef: {
        editable: true,
        width: 100
      },      
      cacheOverflowSize: 1,
      maxConcurrentDatasourceRequests: 2,
      stopEditingWhenGridLosesFocus: true,
      onGridReady: () => {                      
      this.gridOptions.api.sizeColumnsToFit();
      this.createDatasource(_http);
      }            
    };
    this.gridOptionsLines = <GridOptions>{
      paginationPageSize: 1000,
      enableServerSideSorting: true,
      enableColResize: true,
      enableServerSideFilter: true,
      rowSelection: 'multiple',
      rowDeselectio: true,
      rowModelType: 'infinite',
      columnDefs: this.columnDefs,
      cacheBlockSize: 999,
      infiniteInitialRowCount: 1000,      
      defaultColDef: {
        editable: true,
        width: 100
      },      
      cacheOverflowSize: 1,
      maxConcurrentDatasourceRequests: 2,
      stopEditingWhenGridLosesFocus: true,
      onGridReady: () => {                      
      this.gridOptionsLines.api.sizeColumnsToFit();
      this.createDatasourceLines(_http);
      }
    };
    

    this.columnDefs = [
      {headerName: "Order Id", field: "orderId", width: 150, suppressMenu: true, suppressFilter: true, pinned: "left"},
      {headerName: "Price", field: "price", width: 150, suppressMenu: true, suppressFilter: true, editable: true, pinned: "right"},
      {headerName: "Duration", field: "duration", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Is Buy Order", field: "isBuyOrder", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Issued", field: "issued", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Location Id", field: "locationId", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Min volume", field: "minVolume", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Range", field: "range", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Type Id", field: "typeId", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Volume remain", field: "volumeRemain", width: 150, suppressMenu: true, suppressFilter: true, editable: true},
      {headerName: "Volume total", field: "volumeTotal", width: 150, suppressMenu: true, suppressFilter: true, editable: true}
    ];    
    //this._orders.getorders()
    //.subscribe(rowData => this.rowData = rowData);
    console.log(this.gridOptions.paginationPageSize);
  }
  
  public createDatasource = (_http: Http) =>{    
    var me = this;
    this.dataSource={
      //rowModelType: 'infinite',
      rowCount: null, // behave as infinite scroll      
      //maxPagesInCache: 20,
      //maxBlocksInCache: 2,                
      getRows: function _getRows(params){
          console.log('asking for ' + params.startRow + ' to ' + params.endRow);          
          //Creating the request url with sorting if needed         
          me.sortingParametersBefore=me.sortingParameters;
          me.sortingParameters = "";
          if(params.sortModel.length>0){
              for(var k=0;k<params.sortModel.length; k++ ){
                me.sortingParameters+="&sort="+params.sortModel[k].colId+","+params.sortModel[k].sort;
              }
              if((me.sortingParameters!==me.sortingParametersBefore)){
                me.currentPage = 0;
                me.allOfTheData =[];
              }
  
          }
          console.log('currentPage: ' + me.currentPage + ', maxNumber: ' + me.maxNumber);
          if(me.currentPage <= me.maxNumber){
            //http request for CORS request      
            //me.url = "http://localhost:8081/orders?page="+me.currentPage + "&size="+me.size + me.sortingParameters +"&callback=JSONP_CALLBACK";
            me.url = "http://localhost:8082/orders?page="+me.currentPage + "&size="+me.size + me.sortingParameters;
              _http.get(me.url)
              .map(res => this.res = res.json())                  
              .subscribe(data => {                
                me.allOfTheData = me.allOfTheData.concat(data.content);
                  if(data.first===true) me.maxNumber=data.totalPages;
                  // take a slice of the total rows
                  var rowsThisPage = me.allOfTheData.slice(
                      params.startRow, params.endRow);
                  // if on or after the last page, work out the last row.
                  var lastRow = -1;
                  if (me.allOfTheData.length <= params.endRow) {
                      lastRow = me.allOfTheData.length;
                  }
                  me.currentPage+=1;
                  // call the success callback
                  params.successCallback(rowsThisPage, lastRow);
              });
          }  
      }
    }
    this.gridOptions.api.setDatasource(this.dataSource);
  }

  public createDatasourceLines = (_http: Http) =>{    
    var me = this;
    this.dataSourceLines={
      //rowModelType: 'infinite',
      rowCount: null, // behave as infinite scroll      
      //maxPagesInCache: 20,
      //maxBlocksInCache: 2,                
      getRows: function _getRows(params){
          console.log('asking for ' + params.startRow + ' to ' + params.endRow);          
          //Creating the request url with sorting if needed         
          me.sortingParametersBeforeLines=me.sortingParametersLines;
          me.sortingParametersLines = "";
          if(params.sortModel.length>0){
              for(var k=0;k<params.sortModel.length; k++ ){
                me.sortingParametersLines+="&sort="+params.sortModel[k].colId+","+params.sortModel[k].sort;
              }
              if((me.sortingParametersLines!==me.sortingParametersBeforeLines)){
                me.currentPageLines = 0;
                me.allOfTheDataLines =[];
              }
  
          }
          console.log('currentPage: ' + me.currentPageLines + ', maxNumber: ' + me.maxNumberLines);
          if(me.currentPageLines <= me.maxNumberLines){
            //http request for CORS request      
            //me.url = "http://localhost:8081/orders?page="+me.currentPage + "&size="+me.size + me.sortingParameters +"&callback=JSONP_CALLBACK";
            me.urlLines = "http://localhost:8082/orders?page="+me.currentPageLines + "&size="+me.size + me.sortingParametersLines;
              _http.get(me.urlLines)
              .map(res => this.res = res.json())                  
              .subscribe(data => {                
                me.allOfTheDataLines = me.allOfTheDataLines.concat(data.content);
                  if(data.first===true) me.maxNumber=data.totalPages;
                  // take a slice of the total rows
                  var rowsThisPage = me.allOfTheDataLines.slice(
                      params.startRow, params.endRow);
                  // if on or after the last page, work out the last row.
                  var lastRow = -1;
                  if (me.allOfTheDataLines.length <= params.endRow) {
                      lastRow = me.allOfTheDataLines.length;
                  }
                  me.currentPageLines+=1;
                  // call the success callback
                  params.successCallback(rowsThisPage, lastRow);
              });
          }  
      }
    }
    this.gridOptionsLines.api.setDatasource(this.dataSourceLines);
  }

  ngOnInit(): void {
   // this._orders.getorders()
   // .subscribe(iorders => this.iorders = iorders);
  }
}
