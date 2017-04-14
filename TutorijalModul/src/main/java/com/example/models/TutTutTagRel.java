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
		public void settutId(Tutorial t)
		{
			this.tutId = t;
		}
		
		
		@ManyToOne
		private TutorialTag tagId;
		public void settagId(TutorialTag t)
		{
			this.tagId = t;
		}
		
		
		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}

		

		public TutTutTagRel()
		{}
		
		
	
}
