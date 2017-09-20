package com.emt.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.emt.entity.Line;

//it's not a simple CrudRepository!
public interface LineRepository extends PagingAndSortingRepository<Line, Integer> {
	List<Line> findByStationid(Integer stationid);
	List<Line> findByStationidStartsWith(String stationid);
}
