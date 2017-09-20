package com.emt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.emt.entity.Order;

//it's not a simple CrudRepository!
public interface OrderRepository extends PagingAndSortingRepository<Order, Integer> {
	List<Order> findByLocationId(String locationId);
	List<Order> findByLocationIdStartsWith(String locationId);
	
//	 @Procedure(name = "in_only_test")
//	    void inOnlyTest(@Param("inParam1") String inParam1);	
}
