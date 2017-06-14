package Models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

@Entity
public class Test {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String input;
	private String output;
	private Integer time_ms;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="task_id")
	//@OnDelete(action = OnDeleteAction.CASCADE)
	private Task task;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public Integer getTime_ms() {
		return time_ms;
	}

	public void setTime_ms(Integer time_ms) {
		this.time_ms = time_ms;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}
	
	public Test() {}
	
	
}
