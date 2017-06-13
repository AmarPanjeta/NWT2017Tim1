package com.example.models;



import java.util.Date;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@ManyToOne
	private RegisteredUser regUser;
	
	@ManyToOne
	private Discussion discuss;
	
	@JsonIgnore
	@OneToMany(mappedBy="comment",orphanRemoval=true,fetch=FetchType.LAZY)
	private Set<Vote> votes;
	
	public Set<Vote> getVotes() {
		return votes;
	}
	public void setVotes(Set<Vote> votes) {
		this.votes = votes;
	}
	private String text;
	
	@Basic(optional=false)
	@Column(insertable=false,columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	public Date getCreated() {
		return created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
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
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Comment(){}
	
}
