package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


//ovo je oznaaka kao za pocetnike, strukture i slicno
@Entity
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String text;
	
	
	
	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getText() {
		return text;
	}



	public void setText(String text) {
		this.text = text;
	}



	public Tag()
	{
		
	}
	
	public Tag(long id, String text)
	{
		this.id = id;
		this.text = text;
	}

}
