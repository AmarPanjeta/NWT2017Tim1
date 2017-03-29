package com.example.controllers;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.models.Tag;

public class TagController {
	
	
    final AtomicLong id = new AtomicLong();

    @RequestMapping("/tagovi")
    public Tag tagovi(@RequestParam(value="name") String name) {
        return new Tag(id.incrementAndGet(), name);
    }

}
