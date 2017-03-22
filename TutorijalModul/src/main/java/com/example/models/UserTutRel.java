package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class UserTutRel {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@ManyToOne
	private Tutorial TutId;
	@ManyToOne
	private TutorialUser UserId;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Tutorial getTutId() {
		return TutId;
	}

	public void setTutId(Tutorial tutId) {
		TutId = tutId;
	}

	public TutorialUser getUserId() {
		return UserId;
	}

	public void setUserId(TutorialUser userId) {
		UserId = userId;
	}

	public UserTutRel()
	{}
	
}
