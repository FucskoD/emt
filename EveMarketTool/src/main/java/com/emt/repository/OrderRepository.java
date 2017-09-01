package com.emt.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.emt.entity.Order;

//it's not a simple CrudRepository!
public interface OrderRepository extends PagingAndSortingRepository<Order, Integer> {
	List<Order> findByLocationId(String locationId);
	List<Order> findByLocationIdStartsWith(String locationId);
	
}
