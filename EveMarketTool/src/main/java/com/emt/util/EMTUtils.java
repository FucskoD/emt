package com.emt.util;

import java.util.ArrayList;
import java.util.List;

public class EMTUtils {

	public static <E> List<E> toList(Iterable<E> iterable){
		if(iterable instanceof List) {
			return (List<E>) iterable;
		}
		
		ArrayList<E> list = new ArrayList<E>();
		if(iterable != null){
			for(E e : iterable) {
				list.add(e);
			}
		}
		return list;
	}
}
