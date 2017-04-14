package Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import Models.RegisteredUser;
import Models.Solution;
import Models.Task;
import Repositories.RegisteredUserRepository;
import Repositories.SolutionRepository;
import Repositories.TaskRepository;

@RestController
@RequestMapping(value="/user")
public class RegisteredUserController {

	@Autowired 
	private RegisteredUserRepository rur;
	
	@Autowired
	private TaskRepository tr;
	
	@Autowired
	private SolutionRepository sr;
	
	@Autowired
	private RestTemplate rt;
	
	//taskovi usera sa unesenim id-em
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
	
	//rjesenja koja je user sa unesenim id-em postavio
	@RequestMapping(value="/{id}/solutions")
	public List<Solution> getUsersSolutions(@PathVariable("id") long id) throws Exception
	{
		RegisteredUser r=rur.findById(id);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Ne postoji user sa tim id-em");
		}
		
		List<Solution> solutions =sr.getAllUserSolutions(id);
		
		if(solutions.isEmpty())
		{
			throw new Exception("Nema rjesenja koja je taj user postavio");
		}
		
		return solutions;	
	}
	
	@RequestMapping("/{username}/isAdmin")
	public Boolean isAdmin(@PathVariable("username") String username)
	{		
		List<String> roles=rt.getForObject("http://users-client/user/roles?username="+username,List.class);
		return roles.contains("admin");
	}
	
	@RequestMapping("/{username}/isLogged")
	public Boolean isLogged(@PathVariable("username") String username)
	{
		Boolean log=rt.getForObject("http://users-client/user/logged?username="+username,Boolean.class);
		return log;
	}
	
	
	
	
	
	
}
