package Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Models.Solution;
import Models.Task;
import Models.Test;
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
	private SolutionRepository sr;
	
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

}
