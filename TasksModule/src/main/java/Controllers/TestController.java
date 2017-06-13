package Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Models.Task;
import Models.Test;
import Repositories.TaskRepository;
import Repositories.TestRepository;

@RestController
@RequestMapping("/tests")
public class TestController {
	@Autowired
	private TestRepository testr;
	
	@Autowired
	private TaskRepository tr;
	
	@RequestMapping("/addtests")
	public void addTests(@RequestBody TestoviBody t) throws Exception
	{
		if(t.testovi.isEmpty())
		{
			throw new Exception("Testovi ne smiju biti prazni");
		}
		
		Task task=tr.findById(t.testovi.get(0).taskid);
		
		if(task.getTaskTitle()==null)
		{
			throw new Exception("Taj task ne postoji");
		}
		
		
		for(TestBody tb:t.testovi)
		{
			Test spasi=new Test();
			spasi.setInput(tb.input);
			spasi.setOutput(tb.output);
			spasi.setTask(task);
			spasi.setTime_ms(null);
			
			testr.save(spasi);
		}	
	}
	
	@SuppressWarnings("unused")
	private static class TestBody{
		public String input;
		public String output;
		public long taskid;
	}
	
	@SuppressWarnings("unused")
	private static class TestoviBody{
		public List<TestBody> testovi;
	}
	
	
	
	
	
}
