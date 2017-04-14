package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.models.TutorialUser;
import com.example.repositories.TutorialUserRepository;

@Component
public class Receiver {
	
	@Autowired
	private TutorialUserRepository ur;
	
    public void receiveMessage(String message) {
        System.out.println("Received <" + message + ">");
        String[] niz=message.split("\\;");
        //System.out.println(niz[0]);
        if(niz[2].equals("create")){
        TutorialUser user=new TutorialUser();
        user.setName(niz[0]);
        ur.save(user);
        }else if(niz[2].equals("delete")){
        	TutorialUser user=ur.findByName(niz[0]);
        	ur.delete(user);
        }
    }
}
