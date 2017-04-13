package Controllers;

import static org.mockito.Matchers.longThat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
@RequestMapping("/task")
public class TaskController {
	
	@Autowired
	private TaskRepository tr;
	
	@Autowired
	private TestRepository testr;
	
	@Autowired
	private RegisteredUserRepository rur;
	
	@Autowired
	private SolutionRepository sr;
	
	@Autowired
	private RestTemplate rt;
	
	//vraca sve testove za zadatak sa unesenim id-em
	@RequestMapping(value="/{id}/tests")
	public List<Test> getTaskTests(@PathVariable("id") long id) throws Exception
	{
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		List<Test> testovi=testr.getAllTaskTests(id);
		
		if(testovi.isEmpty())
		{
			throw new Exception("Ne postoje testovi za zadatak");
		}
		
		return testovi;
	}
	
	//vraca sva rjesenja za zadatak sa unesenim id-em
	@RequestMapping(value="/{id}/solutions")
	public List<Solution> getTaskSolutions(@PathVariable("id") long id) throws Exception
	{
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		List<Solution> solutions=sr.getAllTaskSolutions(id);
		
		if(solutions.isEmpty())
		{
			throw new Exception("Ne postoje rjesenja za zadatak");
		}
		
		return solutions;
	}
	
	//vraca 10 najboljih rjesenja za zadatak sa unesenim id-em
	@RequestMapping(value="/{id}/tenBestSolutions")
	public List<Solution> getTenBestSolutions(@PathVariable("id") long id) throws Exception
	{
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		List<Solution> solutionsOrdered=sr.findAllTaskSolutionsOrderedByPassing(id);
		
		if(solutionsOrdered.isEmpty())
		{
			throw new Exception("Ne postoje rjesenja za zadatak");
		}
		
		if(solutionsOrdered.size()>10)
		{
			return solutionsOrdered.subList(0, 9);
		}
		
		return solutionsOrdered;		
	}
	
	//dodaje novi task
	@RequestMapping("/addTask")
	public void addTask(@RequestBody TaskBody task) throws Exception
	{
		if(task.text==null || task.creatorsSolution==null || task.username==null)
		{
			throw new Exception("Polja za unos taska nisu popunjena");
		}
		
		Boolean log=rt.getForObject("http://users-client/user/logged?username="+task.username,Boolean.class);
		
		if(!log)
		{
			throw new Exception("Korisnik sa tim username-om nije logovan.");
		}
		
		RegisteredUser r=rur.findByUsername(task.username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Korisnik ne postoji?!");
		}
		
		Task novi=new Task();
		novi.setTaskText(task.text);
		novi.setCreatorsSolution(task.creatorsSolution);
		novi.setUser(r);	
		
		tr.save(novi);
	}
	
	//dodaje test za task
	@RequestMapping("/{id}/addTest")
	public void addTaskTest(@PathVariable("id") long id, @RequestBody TestBody test) throws Exception
	{
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		if(test.input==null || test.output==null || test.time_ms==null)
		{
			throw new Exception("Polja za unos testa nisu popunjena");
		}
		
		Test novi=new Test();
		novi.setInput(test.input);
		novi.setOutput(test.output);
		novi.setTime_ms(test.time_ms);
		novi.setTask(t);
		testr.save(novi);
		
		if(!t.getTests().add(novi))
		{
			testr.delete(novi.getId());
			throw new Exception("Nesto nije okej sa taskom?!");
		}
	}
	
	//brisanje taska
	@RequestMapping("/{id}/delete")
	public void deleteTask(@PathVariable("id") long id) throws Exception
	{
		//provjeriti privilegije!!!!
		
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		tr.delete(id);		
	}
	
	//novo rjesenje za task
	@RequestMapping("/{id}/addSolution")
	public void addTaskSolution(@PathVariable("id") long id, @RequestBody SolutionBody sb) throws Exception
	{
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		Boolean log=rt.getForObject("http://users-client/user/logged?username="+t.getUser().getUsername(),Boolean.class);
		
		if(!log)
		{
			throw new Exception("Korisnik sa tim username-om nije logovan.");
		}
		
		RegisteredUser r=rur.findByUsername(t.getUser().getUsername());
		
		if(r.getUsername()==null)
		{
			throw new Exception("Korisnik ne postoji?!");
		}
		
		Solution novi=new Solution();
		novi.setCode(sb.code);	
		novi.setUser(r);
		//ovo dodati uz compilermodule!!!!!!!!!!  novi.setPassing(passing);
		sr.save(novi);
		
		if(!t.getSolutions().add(novi))
		{
			sr.delete(novi.getId());
			throw new Exception("Nesto nije okej sa taskom?!");
		}
	}
	
	

	
	@SuppressWarnings("unused")
	private static class TaskBody{
		public String text;
		public String creatorsSolution;
		public String username;
	}	
	
	@SuppressWarnings("unused")
	private static class TestBody{
		public String input;
		public String output;
		public Integer time_ms;
	}	
	
	@SuppressWarnings("unused")
	private static class SolutionBody{
		public String code;
		public String username;
	}	
}
