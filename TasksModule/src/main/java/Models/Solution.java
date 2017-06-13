package Models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Solution {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String code;
	private Integer passing;
	
	@Temporal(TemporalType.DATE)
	private Date datumPostavljanjaRjesenja;
	

	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="user_id")
	//@OnDelete(action = OnDeleteAction.CASCADE)
	private RegisteredUser user;
	
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="task_id")
	//@OnDelete(action = OnDeleteAction.CASCADE)
	private Task task;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getPassing() {
		return passing;
	}

	public void setPassing(Integer passing) {
		this.passing = passing;
	}

	public RegisteredUser getUser() {
		return user;
	}

	public void setUser(RegisteredUser user) {
		this.user = user;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}
	
	public Date getDatumPostavljanjaRjesenja() {
		return datumPostavljanjaRjesenja;
	}

	public void setDatumPostavljanjaRjesenja(Date datumPostavljanjaRjesenja) {
		this.datumPostavljanjaRjesenja = datumPostavljanjaRjesenja;
	}
	
	public Solution() {}
	
	
}
