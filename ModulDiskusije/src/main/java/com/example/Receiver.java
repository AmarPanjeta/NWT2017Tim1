package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.models.RegisteredUser;
import com.example.repositories.UserRepository;

@Component
public class Receiver {
	
	@Autowired
	private UserRepository ur;
	
    public void receiveMessage(String message) {
        System.out.println("Received <" + message + ">");
        String[] niz=message.split("\\;");
        //System.out.println(niz[0]);
        if(niz[2].equals("create")){
        RegisteredUser user=new RegisteredUser();
        user.setUsername(niz[0]);
        user.setEmail(niz[1]);
        ur.save(user);
        }else if(niz[2].equals("delete")){
        	RegisteredUser user=ur.findByUsername(niz[0]);
        	ur.delete(user);
        }
    }
}
