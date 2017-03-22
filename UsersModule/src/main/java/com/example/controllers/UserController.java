package com.example.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Scanner;

import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
	
	@RequestMapping("/do")
	public void doCode(@RequestParam(value="command",required=false) String command){
		Runtime r =Runtime.getRuntime();
		try {
			System.out.println(command);
			if(command!=null){
				Process p=r.exec(command);
				InputStream is= p.getInputStream();
				p.waitFor();
				
				Scanner s= new Scanner(is).useDelimiter("\\A");
				System.out.println(s.hasNext() ? s.next(): "nema");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/helloworld")
	public void saveAndExec(){
		String[] commands={"printf","#include<iostream>\nusing namespace std; int main(){ cout<<794; return 0;}",">>","prog.cpp"};
		Runtime r = Runtime.getRuntime();
		ProcessBuilder pb=new ProcessBuilder("printf","#include<iostream>\nusing namespace std; int main(){ cout<<794; return 0;}").redirectOutput(new File("prog.cpp"));
		try {
			Process p = r.exec(commands);
			InputStream is= p.getInputStream();
			p.waitFor();
			pb.start().waitFor();
			Scanner s= new Scanner(is).useDelimiter("\\A");
			System.out.println(s.hasNext() ? s.next(): "nema");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}
