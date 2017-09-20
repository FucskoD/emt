export interface IOrders{
    orderId: number;
    price: number;
    duration: number;
    isBuyOrder:boolean;
    issued:Date;
    locationId:number;
    minVolume:number;
    range:string
    typeId:number;
    volumeRemain:number;
    volumeTotal: number;
}