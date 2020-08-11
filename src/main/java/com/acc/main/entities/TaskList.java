package com.acc.main.entities;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskList {
	
	@Id
	@GeneratedValue
	private Long id;
	private String description;
	@OneToMany
    private List<TaskListItem> taskListItems;
	

}
