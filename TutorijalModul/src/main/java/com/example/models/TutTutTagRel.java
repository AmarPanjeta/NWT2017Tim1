package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

//ovo je tutorial tag - tutorial relacija
@Entity
public class TutTutTagRel {
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;
		
		@ManyToOne
		private Tutorial tutId;
		@ManyToOne
		private TutorialTag tagId;
		
		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		

		public TutTutTagRel()
		{}
		
		
	
}
