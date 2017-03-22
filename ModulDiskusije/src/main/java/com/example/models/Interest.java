package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Interest {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@ManyToOne
	private RegisteredUser regUser;
	
	@ManyToOne
	private Discussion discuss;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public RegisteredUser getRegUser() {
		return regUser;
	}

	public void setRegUser(RegisteredUser regUser) {
		this.regUser = regUser;
	}

	public Discussion getDiscuss() {
		return discuss;
	}

	public void setDiscuss(Discussion discuss) {
		this.discuss = discuss;
	}

	public Interest(){}

}
