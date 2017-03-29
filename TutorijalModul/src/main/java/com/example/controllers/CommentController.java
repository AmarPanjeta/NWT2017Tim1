package com.example.controllers;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Comment;
import com.example.models.Tag;
import com.example.repositories.CommentRepository;

@RestController
public class CommentController {

	
	 final AtomicLong id = new AtomicLong();
	 private CommentRepository cr ;
	 
	 
	    @RequestMapping("/coms")
	    public Comment tagovi(@RequestParam(value="name") String name, @RequestParam(value="usrId") Long usrId) {
	        return new Comment(id.incrementAndGet(), name, usrId);
	    }

	    
	    
}
