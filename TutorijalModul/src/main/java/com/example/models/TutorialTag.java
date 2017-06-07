package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//ovo je Tutorial tag, ovo postavljaju korisnici kao bilo je korisni nije bilo korisno
@Entity
public class TutorialTag {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private int Stars;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getStars() {
		return this.Stars;
	}

	public void setStars(int Stars) {
		this.Stars = Stars;
	}

	public TutorialTag()
	{}
	
	
	public TutorialTag(Long id, int Stars)
	{
		this.id = id;
		this.Stars = Stars;
		
	}
}
