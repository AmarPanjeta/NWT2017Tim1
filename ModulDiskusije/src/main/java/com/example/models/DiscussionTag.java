package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class DiscussionTag {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@ManyToOne
	private Tag tg;
	
	@ManyToOne
	private Discussion discuss;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Tag getTg() {
		return tg;
	}
	public void setTg(Tag tg) {
		this.tg = tg;
	}
	public Discussion getDiscuss() {
		return discuss;
	}
	public void setDiscuss(Discussion discuss) {
		this.discuss = discuss;
	}
	public DiscussionTag(){};
	
}
