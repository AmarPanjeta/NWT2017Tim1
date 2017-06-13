package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.Length;

@Entity
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Length(max = 100000)
	private String text;
	private long tutId;
	
	//@ManyToOne
	//private Tutorial TutId;
	//@ManyToOne
	//private TutorialUser TutUsrID;
	
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
/*
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
	}*/

	public Comment()
	{
		
	}
	public void settutId(Long tutId)
	{
		this.tutId = tutId;
	}
	
	public long gettutId()
	{
		return this.tutId;
	}
	
	public Comment(Long id, String text, Long UsrId, Long tutId){
		this.id = id;
		this.text = text;
		//TutorialUser tu = new TutorialUser(UsrId);
		this.tutId = tutId;
		
	}
}
