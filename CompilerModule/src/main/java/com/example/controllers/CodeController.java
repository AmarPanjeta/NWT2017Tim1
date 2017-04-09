package com.example.controllers;

import java.io.File;
import java.io.InputStream;
import java.util.Scanner;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.datamodels.CodeClass;
import com.example.datamodels.ResultClass;

@RestController
@RequestMapping("compiler")
public class CodeController {
	
	@Autowired
	RestTemplate restTemplate;
	
	@RequestMapping("run")
	public ResultClass runCode(@RequestBody CodeClass code){
		System.out.println(code.code);
		System.out.println(code.username);
		ResultClass result=new ResultClass("working", "/");
		Runtime r=Runtime.getRuntime();
		ProcessBuilder pb=new ProcessBuilder("printf",code.code).redirectOutput(new File("prog.cpp"));
		try {
			Process p = r.exec("rm prog.cpp");
			p.waitFor();
			pb.start().waitFor();
			pb=new ProcessBuilder("g++","-o","prog","prog.cpp");
			pb.start().waitFor();/*
			p=r.exec("g++ -o prog.cpp");
			p.waitFor();*/
			p=r.exec("./prog");
			InputStream is = p.getInputStream();
			Scanner s= new Scanner(is).useDelimiter("\\A");
			String output=s.hasNext() ? s.next(): "nema";
			System.out.println(output);
			result.result=output;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			result.status="not working";
		}
		return result;
	}
	
	@RequestMapping("gccversion")
	public String gccVersion() throws ServletException{
		Runtime r=Runtime.getRuntime();
		ProcessBuilder pb=new ProcessBuilder("g++","--version");
		String result;
		try {
			Process p = pb.start();
			p.waitFor();
			InputStream is=p.getInputStream();
			Scanner s=new Scanner(is).useDelimiter("\\A");
			result=s.hasNext()? s.next():"";
			
		} catch (Exception e) {
			throw new ServletException("Greska!");
		}
		return result;
	}
	
	@RequestMapping("threads")
	public String activeThreads(){
		return "Broj trenutno aktivnih tredova unutar JVMa:"+Integer.toString(Thread.activeCount());
	}
	
	@RequestMapping("gug")
	public String gug(){
		String odg = restTemplate.getForObject("http://www.google.com", String.class);
		return odg;
	}
	
	@RequestMapping("eureka")
	public String eureka(){
		String odg = restTemplate.getForObject("http://compiler-client/compiler/gccversion", String.class);
		return odg;
	}
	
	@RequestMapping("users")
	public String users(){
		String odg=restTemplate.getForObject("http://users-client/users", String.class);
		return odg;
	}
}
