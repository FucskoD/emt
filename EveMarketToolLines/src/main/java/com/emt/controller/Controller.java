package com.emt.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

import com.emt.entity.Line;
import com.emt.repository.LineRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class Controller {
	private LineRepository lineRepository;
	
	@Autowired
	public void setRepository(LineRepository lineRepository) {
		this.lineRepository = lineRepository;
	}
	@RequestMapping("/lines")
	public @ResponseBody List<Line>alllines() {
		List<Line> lineList = new ArrayList<Line>();
		lineRepository.findAll().forEach(lineList::add);
		
		return lineList;
	}
	
    @ControllerAdvice
    static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {
        public JsonpAdvice() {
            super("callback");
        }
    }
	
	@RequestMapping(value="/{stationid:[\\d]+}", method = RequestMethod.GET)
	public @ResponseBody List<Line> linesByLocationId(@PathVariable Integer stationid) {
		List<Line> lineList = lineRepository.findByStationid((stationid));
		return lineList;
	}
	
	@RequestMapping(value ="/", method = RequestMethod.GET, produces =MediaType.APPLICATION_JSON_VALUE)	
	public @ResponseBody Page<Line> list (Pageable pageable){
		Page<Line> lines = lineRepository.findAll(pageable);
		return lines;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<Line> update(@RequestBody Line line){
		if(line != null && lineRepository.exists(Integer.valueOf(line.getStationid()))) {
			lineRepository.save(line);
			return new ResponseEntity<Line>(line, HttpStatus.OK);
		}
		return new ResponseEntity<Line>(line, HttpStatus.BAD_REQUEST);
		

		
	}
}
