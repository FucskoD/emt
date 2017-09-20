package com.emt.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ramAssemblyLineStations")
public class Line {
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)	
		private Integer stationid;
		@Column(columnDefinition = "TINYINT")
		private int assembly_line_typeid;
		@Column(columnDefinition = "TINYINT")
		private Integer quantity;
		private Integer station_typeid;
		private Integer ownerid;
		private Integer solar_systemid;
		private Integer regionid;
		
		public Line() {
			
		}

		public Integer getStationid() {
			return stationid;
		}

		public void setStationid(Integer stationid) {
			this.stationid = stationid;
		}
		

		public int getAssembly_line_typeid() {
			return assembly_line_typeid;
		}

		public void setAssembly_line_typeid(int assembly_line_typeid) {
			this.assembly_line_typeid = assembly_line_typeid;
		}

		public Integer getQuantity() {
			return quantity;
		}

		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}

		public Integer getStation_typeid() {
			return station_typeid;
		}

		public void setStation_typeid(Integer station_typeid) {
			this.station_typeid = station_typeid;
		}

		public Integer getOwnerid() {
			return ownerid;
		}

		public void setOwnerid(Integer ownerid) {
			this.ownerid = ownerid;
		}

		public Integer getSolar_systemid() {
			return solar_systemid;
		}

		public void setSolar_systemid(Integer solar_systemid) {
			this.solar_systemid = solar_systemid;
		}

		public Integer getRegionid() {
			return regionid;
		}

		public void setRegionid(Integer regionid) {
			this.regionid = regionid;
		}

		@Override
		public String toString() {
			return "Line [stationid=" + stationid + ", assembly_line_typeid=" + assembly_line_typeid + ", quantity="
					+ quantity + ", station_typeid=" + station_typeid + ", ownerid=" + ownerid + ", solar_systemid="
					+ solar_systemid + ", regionid=" + regionid + "]";
		}

		
		
		
		
}
