package com.example.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Scanner;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.RegisteredUser;
import com.example.models.Role;
import com.example.repositories.ClaimRepository;
import com.example.repositories.RoleRepository;
import com.example.repositories.UserRepository;
import com.example.services.HashService;

@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	RoleRepository rr;
	
	@Autowired
	ClaimRepository cr;
	
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
		}
		catch (Exception e) {
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
	
	@RequestMapping("/register")
	public void register(@RequestBody UserRegisterBody user) throws ServletException{
		
		if(user.email==null || user.email.isEmpty()||user.username==null || user.username.isEmpty()||user.password==null || user.password.isEmpty()){
			throw new ServletException("Polja nisu popunjena!");
		}
		
		int numberOfUsers=ur.userexists(user.username, user.email);
		if(numberOfUsers>0) throw new ServletException("Username ili email su zauzeti!");
		
		RegisteredUser newUser= new RegisteredUser();
		newUser.setUsername(user.username);
		newUser.setEmail(user.email);
		// OVDJE TREBA HASHIRATI PASSWORD
		newUser.setPassword(HashService.hashPassword(user.password));
		newUser.setVerified(false);
		ur.save(newUser);
		
	}
	
	@RequestMapping("/login")
	public String login(@RequestBody UserLoginBody login) throws ServletException{
		
		RegisteredUser user=ur.findUserByUsername(login.username);
		
		if(!HashService.checkPassword(login.password, user.getPassword())) throw new ServletException("Netacna pristupna sifra");
		else return "some token";
	}
	
	@RequestMapping("roles")
	public List<Role> roles(@RequestParam("username") String username){
		return rr.getrolesbyuser(username);
	}
	
	@RequestMapping("logged")
	public boolean logged(@RequestParam("username") String username){
		int number=cr.getnumberofclaims(username);
		return number==0 ? false : true ;
	}
	
	@SuppressWarnings("unused")
	private static class UserRegisterBody{
		public String username;
		public String password;
		public String email;
	}
	
	@SuppressWarnings("unused")
	private static class UserLoginBody{
		public String username;
		public String password;
	}
}
