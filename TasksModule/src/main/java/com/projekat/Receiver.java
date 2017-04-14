package com.projekat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import Models.RegisteredUser;
import Repositories.RegisteredUserRepository;

@Component
public class Receiver {
	
	@Autowired
	private RegisteredUserRepository rur;
	
	@Autowired
	private RestTemplate rt;
		
    public void receiveMessage(String message) {
        System.out.println("Received <" + message + ">");
        String[] niz=message.split("\\;"); //poruka je Received <bbb;lalalla@lala.lala;create>
        
        if(niz[2].equals("create"))
        {
        	RegisteredUser novi=new RegisteredUser();
        	novi.setUsername(niz[0]);
        	
        	List<String> roles=rt.getForObject("http://users-client/user/roles?username="+niz[0],List.class);
    		
        	novi.setAdministratorPrivileges(roles.contains("admin")); 	
        	rur.save(novi);
        }
        
        else if(niz[2].equals("delete"))
        {
        	RegisteredUser novi=rur.findByUsername(niz[0]);
        	if(novi.getUsername()!=null) rur.delete(novi.getId());
        }
    }
}
