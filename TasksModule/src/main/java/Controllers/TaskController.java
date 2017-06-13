package Controllers;

import static org.mockito.Matchers.longThat;
import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.util.ArrayList;
import java.util.Date;
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
	
	
	@RequestMapping("/all")
	public List<TaskResponseBody> returnAllTasks()
	{
		 List<Task> lista=tr.getAllTasks();
		 List<TaskResponseBody> vrati=new ArrayList<TaskResponseBody>();

		 for(Task t:lista)
		 {
			 TaskResponseBody pom=new TaskResponseBody();
			 pom.task=t;
			 pom.brojRjesenja=sr.countSolutionsByTask(pom.task.getId());
			 pom.rjesenja=sr.getAllTaskSolutions(pom.task.getId());
			 pom.testovi=testr.getAllTaskTests(pom.task.getId());
			 			 
			 vrati.add(pom);
		 }
		 
		 return vrati;
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
	
	//vraca sva rjesenja za zadatak sa unesenim id-em
		@RequestMapping(value="/{id}/numberofsolutions")
		public int getNumberOfTaskSolutions(@PathVariable("id") long id) throws Exception
		{
			Task t=tr.findById(id);
			
			if(t.getTaskText()==null)
			{
				throw new Exception("Ne postoji taj task");
			}
			
			List<Solution> solutions=sr.getAllTaskSolutions(id);
			
			if(solutions.isEmpty())
			{
				return 0;
				//throw new Exception("Ne postoje rjesenja za zadatak");
			}
			
			return solutions.size();
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
			return solutionsOrdered.subList(0, 10);
		}
		
		return solutionsOrdered;		
	}
	
	//dodaje novi task
	@RequestMapping("/addTask")
	public Task addTask(@RequestBody TaskBody task) throws Exception
	{
		if(task.title==null || task.text==null || task.creatorsSolution==null || task.username==null)
		{
			throw new Exception("Polja za unos taska nisu popunjena");
		}
		
		/*Boolean log=rt.getForObject("http://users-client/user/logged?username="+task.username,Boolean.class);
		
		if(!log)
		{
			throw new Exception("Korisnik sa tim username-om nije logovan.");
		}*/
		
		RegisteredUser r=rur.findByUsername(task.username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Korisnik ne postoji?!");
		}
		
		Task novi=new Task();
		novi.setTaskTitle(task.title);
		novi.setTaskText(task.text);
		novi.setCreatorsSolution(task.creatorsSolution);
		novi.setDatumPostavljanja(new Date());
		novi.setUser(r);	
		
		tr.save(novi);
		
		return novi;
	}
	
	@RequestMapping("/addtaskwithtests")
	public void addTask(@RequestBody TaskAndTestsBody task) throws Exception
	{
		if(task.title==null || task.text==null || task.creatorsSolution==null || task.username==null)
		{
			throw new Exception("Polja za unos taska nisu popunjena");
		}
		
		RegisteredUser r=rur.findByUsername(task.username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Korisnik ne postoji?!");
		}
		
		Task novi=new Task();
		novi.setTaskTitle(task.title);
		novi.setTaskText(task.text);
		novi.setCreatorsSolution(task.creatorsSolution);
		novi.setDatumPostavljanja(new Date());
		novi.setUser(r);	
		
		tr.save(novi);
		
		List<TestBody> testici=task.testovi;
		
		for(TestBody t:testici)
		{
			Test sacuvaj=new Test();
			sacuvaj.setInput(t.input);
			sacuvaj.setOutput(t.output);
			sacuvaj.setTask(novi);
			sacuvaj.setTime_ms(null);
			testr.save(sacuvaj);
		}
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
		
		if(test.input==null || test.output==null)
		{
			throw new Exception("Polja za unos testa nisu popunjena");
		}
		
		/*Boolean log=rt.getForObject("http://users-client/user/logged?username="+t.getUser().getUsername(),Boolean.class);
		
		if(!log)
		{
			throw new Exception("Korisnik koji je postavio taj zadatak nije logovan.");
		}*/
		
		Test novi=new Test();
		novi.setInput(test.input);
		novi.setOutput(test.output);
		novi.setTime_ms(null);
		novi.setTask(t);
		testr.save(novi);
		
		/*if(!t.getTests().add(novi))
		{
			testr.delete(novi.getId());
			throw new Exception("Nesto nije okej sa taskom?!");
		}*/
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
	
	@RequestMapping("/{id}/getuser")
	public RegisteredUser getTasksUser(@PathVariable("id") long id) throws Exception
	{
		Task t=tr.findById(id);
		
		if(t.getTaskText()==null)
		{
			throw new Exception("Ne postoji taj task");
		}
		
		return t.getUser();
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
		
		/*Boolean log=rt.getForObject("http://users-client/user/logged?username="+t.getUser().getUsername(),Boolean.class);
		
		if(!log)
		{
			throw new Exception("Korisnik sa tim username-om nije logovan.");
		}*/
		
		RegisteredUser r=rur.findByUsername(sb.username);
		
		if(r.getUsername()==null)
		{
			throw new Exception("Korisnik ne postoji?!");
		}
		
		Solution novi=new Solution();
		novi.setCode(sb.code);	
		novi.setUser(r);
		novi.setTask(t);
		novi.setDatumPostavljanjaRjesenja(new Date());
		//ovo dodati uz compilermodule!!!!!!!!!!  
		novi.setPassing(0);
		sr.save(novi);
		if(!t.getSolutions().add(novi))
		{
			sr.delete(novi.getId());
			throw new Exception("Nesto nije okej sa taskom?!");
		}
	}
	
	
	@RequestMapping("/{id}/getsolutionsbyuserandtask/{username}")
	public List<Solution> getSolutionUserTask(@PathVariable("id") long id, @PathVariable("username") String username) throws Exception
	{
		Task t=tr.findById(id);		
		RegisteredUser ru=rur.findByUsername(username);
		
		if(t.getTaskText()==null || ru.getUsername()==null)
		{
			throw new Exception("Ne postoji task ili user");
		}
		
		List<Solution> s=sr.getSolutionsByUserAndTask(id, username);
		return s;
	}
	

	

	
	@SuppressWarnings("unused")
	private static class TaskBody{
		public String title;
		public String text;
		public String creatorsSolution;
		public String username;
	}	
	
	@SuppressWarnings("unused")
	private static class TaskAndTestsBody{
		public String title;
		public String text;
		public String creatorsSolution;
		public String username;
		public List<TestBody> testovi;
	}	
	
	@SuppressWarnings("unused")
	private static class TestBody{
		public String input;
		public String output;
	}	
	
	@SuppressWarnings("unused")
	private static class SolutionBody{
		public String code;
		public String username;
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
