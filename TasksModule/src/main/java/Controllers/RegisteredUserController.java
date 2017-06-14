package Controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import Models.RegisteredUser;
import Models.Solution;
import Models.Task;
import Models.Test;
import Repositories.RegisteredUserRepository;
import Repositories.SolutionRepository;
import Repositories.TaskRepository;
import Repositories.TestRepository;

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
	
	@Autowired
	private TestRepository testr;
	
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
	
	@RequestMapping(value="/{username}/solvedTasks")
	public List<TaskResponseBody> getSolvedTasks(@PathVariable("username") String username) throws Exception
	{
		RegisteredUser r=rur.findByUsername(username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Ne postoji user sa tim id-em");
		}
		
		List<Task> lista=rur.getSolvedTasksByUserUsername(r.getUsername());
		List<TaskResponseBody> solvedTasks=new ArrayList<TaskResponseBody>();
		
		for(Task t:lista)
		{
			TaskResponseBody pom=new TaskResponseBody();
			pom.task=t;
			pom.brojRjesenja=sr.countSolutionsByTask(pom.task.getId());
			pom.rjesenja=sr.getAllTaskSolutions(pom.task.getId());
		    pom.testovi=testr.getAllTaskTests(pom.task.getId());
		    
		    solvedTasks.add(pom);
		}
		
		return solvedTasks;
	}
	
	@RequestMapping("/{username}/unsolvedTasks")
	public List<TaskResponseBody> getUnsolvedTasks(@PathVariable("username") String username) throws Exception
	{
		RegisteredUser r=rur.findByUsername(username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Ne postoji user sa tim id-em");
		}
		
		List<Solution> solutions =sr.getAllUserSolutions(r.getId());
		List<Task> lista=tr.getAllTasks();
		List<TaskResponseBody> unsolvedTasks=new ArrayList<TaskResponseBody>();
		
		
		if(solutions.isEmpty())
		{
			for(Task t:lista)
			{
				 TaskResponseBody pom=new TaskResponseBody();
				 pom.task=t;
				 pom.brojRjesenja=sr.countSolutionsByTask(pom.task.getId());
				 pom.rjesenja=sr.getAllTaskSolutions(pom.task.getId());
				 pom.testovi=testr.getAllTaskTests(pom.task.getId());
				 			 
				 unsolvedTasks.add(pom);
			}
			
			return unsolvedTasks;
		}
		
		else
		{
			for(Solution s:solutions)
			{
				lista.remove(s.getTask());
			}
			
			for(Task t:lista)
			{
				 TaskResponseBody pom=new TaskResponseBody();
				 pom.task=t;
				 pom.brojRjesenja=sr.countSolutionsByTask(pom.task.getId());
				 pom.rjesenja=sr.getAllTaskSolutions(pom.task.getId());
				 pom.testovi=testr.getAllTaskTests(pom.task.getId());
				 			 
				 unsolvedTasks.add(pom);
			}
			
			return unsolvedTasks;
		}
		
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
	
	@RequestMapping("/{username}/imaPrivilegije")
	public Boolean imaPrivilegije(@PathVariable("username") String username) throws Exception
	{
		RegisteredUser r=rur.findByUsername(username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Ne postoji user sa tim usernameom");
		}
		
		return r.getAdministratorPrivileges();	
	}
	
	
	@SuppressWarnings("unused")
	private static class TaskResponseBody
	{
		public Task task;
		public int brojRjesenja;
		public List<Test> testovi;
		public List<Solution> rjesenja;
	}
	
	
	
	
	
	
}
