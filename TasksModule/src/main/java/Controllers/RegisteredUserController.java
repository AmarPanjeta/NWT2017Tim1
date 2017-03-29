package Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Models.RegisteredUser;
import Models.Task;
import Repositories.RegisteredUserRepository;
import Repositories.TaskRepository;

@RestController
@RequestMapping(value="/user")
public class RegisteredUserController {

	@Autowired 
	private RegisteredUserRepository rur;
	
	@Autowired
	private TaskRepository tr;
	
	@RequestMapping(value="/{id}/tasks")
	public List<Task> getUsersAddedTasks(@PathVariable("id") long id) throws Exception
	{
		RegisteredUser r=rur.findById(id);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Ne postoji user sa tim id-em");
		}
		
		List<Task> tasks=tr.getAllUserTasks(id);
		
		if(tasks.isEmpty())
		{
			throw new Exception("Nema taskova za tog usera");
		}
		
		return tasks;	
	}
	
	
	
	
}
