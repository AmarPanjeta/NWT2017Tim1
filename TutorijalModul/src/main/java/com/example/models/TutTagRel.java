package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

//ovo je tutorijal - oznaka veza
@Entity
public class TutTagRel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	
	@ManyToOne
	private  Tutorial tutId;
	@ManyToOne
	private Tag tagId;
	
	public void settutId(Tutorial t) {
		this.tutId = t;
	}
	
	
	public void settagId(Tag t) {
		this.tagId = t;
	}
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public TutTagRel()
	{}
	
	
}
