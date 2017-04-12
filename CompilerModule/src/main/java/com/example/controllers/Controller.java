package com.example.controllers;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	@Autowired
	CodeController cc;
	
	@RequestMapping("thisisit")
	public String thisisit() throws ServletException{
		return cc.gccVersion();
	}
}
