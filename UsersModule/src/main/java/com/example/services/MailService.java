package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	
	private MailSender mailSender;
	private SimpleMailMessage templateMessage;
	
	@Autowired
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void setTemplateMessage(SimpleMailMessage templateMessage) {
        this.templateMessage = templateMessage;
    }
    
    public void sendMail(){
    	SimpleMailMessage msg= new SimpleMailMessage();
    	msg.setTo("amar.panjeta@gmail.com");
    	msg.setText("da li radi?");
    	msg.setReplyTo("braco@noreply.com");
    	msg.setFrom("braco@noreply.com");
    	try {
    		mailSender.send(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    
    public void sendActivationMail(String email, String activation){
    	SimpleMailMessage msg= new SimpleMailMessage();
    	msg.setTo(email);
    	msg.setText("Link za aktivaciju vaseg profila je http://localhost:8081/user/activate/"+activation);
    	msg.setReplyTo("nijebraco@noreply.com");
    	msg.setFrom("nijebraco@noreply.com");
    	try {
    		mailSender.send(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    
    public void sendResetPasswordMail(String email, String forgotPassword){
    	SimpleMailMessage msg=new SimpleMailMessage();
    	msg.setTo(email);
    	msg.setText("Link za reset vaseg password-a je http://localhost:8081/user/resetpassword/"+forgotPassword);
    	msg.setReplyTo("nismomi@gmail.com");
    	msg.setFrom("nismomi@noreply.com");
    	try{
    		mailSender.send(msg);
    	} catch (Exception e) {
			// TODO: handle exception
    		e.printStackTrace();
		}
    	
    }
}
