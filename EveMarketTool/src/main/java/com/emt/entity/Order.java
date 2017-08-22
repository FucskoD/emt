package com.emt.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String orderId;
	private String typeId;
	private String locationId;
	private String volumeTotal;
	private String volumeRemain;
	private String minVolume;
	private String price;
	private String isBuyOrder;
	private String duration;
	private String issued;
	private String range;
	
	public Order() {
		
	}
	
	
	public Order(String orderId, String typeId, String locationId, String volumeTotal, String volumeRemain,
			String minVolume, String price, String isBuyOrder, String duration, String issued, String range) {	
		this.orderId = orderId;
		this.typeId = typeId;
		this.locationId = locationId;
		this.volumeTotal = volumeTotal;
		this.volumeRemain = volumeRemain;
		this.minVolume = minVolume;
		this.price = price;
		this.isBuyOrder = isBuyOrder;
		this.duration = duration;
		this.issued = issued;
		this.range = range;
	}


	public String getOrderId() {
		return orderId;
	}


	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}


	public String getTypeId() {
		return typeId;
	}


	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}


	public String getLocationId() {
		return locationId;
	}


	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}


	public String getVolumeTotal() {
		return volumeTotal;
	}


	public void setVolumeTotal(String volumeTotal) {
		this.volumeTotal = volumeTotal;
	}


	public String getVolumeRemain() {
		return volumeRemain;
	}


	public void setVolumeRemain(String volumeRemain) {
		this.volumeRemain = volumeRemain;
	}


	public String getMinVolume() {
		return minVolume;
	}


	public void setMinVolume(String minVolume) {
		this.minVolume = minVolume;
	}


	public String getPrice() {
		return price;
	}


	public void setPrice(String price) {
		this.price = price;
	}


	public String getIsBuyOrder() {
		return isBuyOrder;
	}


	public void setIsBuyOrder(String isBuyOrder) {
		this.isBuyOrder = isBuyOrder;
	}


	public String getDuration() {
		return duration;
	}


	public void setDuration(String duration) {
		this.duration = duration;
	}


	public String getIssued() {
		return issued;
	}


	public void setIssued(String issued) {
		this.issued = issued;
	}


	public String getRange() {
		return range;
	}


	public void setRange(String range) {
		this.range = range;
	}



	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", typeId=" + typeId + ", locationId=" + locationId + ", volumeTotal="
				+ volumeTotal + ", volumeRemain=" + volumeRemain + ", minVolume=" + minVolume + ", price=" + price
				+ ", isBuyOrder=" + isBuyOrder + ", duration=" + duration + ", issued=" + issued + ", range=" + range
				+ "]";
	}
	
	
	
}
