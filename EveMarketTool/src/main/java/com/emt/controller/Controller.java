package com.emt.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

import com.emt.entity.Order;
import com.emt.repository.OrderRepository;

@RestController
public class Controller {
	private OrderRepository orderRepository;
	
	@Autowired
	public void setRepository(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	@RequestMapping("/orders")
	public @ResponseBody List<Order>allOrders() {
		List<Order> orderList = new ArrayList<Order>();
		orderRepository.findAll().forEach(orderList::add);
		
		return orderList;
	}
	
    @ControllerAdvice
    static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {
        public JsonpAdvice() {
            super("callback");
        }
    }
	
	@RequestMapping(value="/{locationId:[\\d]+}", method = RequestMethod.GET)
	//@RequestMapping("/{locationId:[\\d]+}")
	//@ResponseBody -- not needed with @RestController annotation
	public @ResponseBody List<Order> ordersByLocationId(@PathVariable long locationId) {
		List<Order> orderList = orderRepository.findByLocationId(((Long)locationId).toString());
		return orderList;
	}
		
	//don't need to pass RequestParams, ?page and size parameters
	//automatically resolved by spring, and a Pageable instance is created (pageingandsortinrepository)
	@RequestMapping(value ="/", method = RequestMethod.GET, produces =MediaType.APPLICATION_JSON_VALUE)	
	public @ResponseBody Page<Order> list (Pageable pageable){
		Page<Order> orders = orderRepository.findAll(pageable);
		return orders;
	}
}
