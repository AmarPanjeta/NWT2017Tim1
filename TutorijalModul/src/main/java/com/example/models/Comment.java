package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String text;
	
	@ManyToOne
	private Tutorial TutId;
	@ManyToOne
	private TutorialUser TutUsrID;
	
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

	public Tutorial getTutId() {
		return TutId;
	}

	public void setTutId(Tutorial tutId) {
		TutId = tutId;
	}

	public TutorialUser getTutUsrID() {
		return TutUsrID;
	}

	public void setTutUsrID(TutorialUser tutUsrID) {
		TutUsrID = tutUsrID;
	}

	public Comment()
	{
		
	}
	
	public Comment(Long id, String text){
		this.id = id;
		this.text = text;
	}
}
