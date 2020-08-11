package com.acc.main.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskListItem {

	@Id
	@GeneratedValue
	private Long id;
	private String description;
	private Boolean IsChecked;
	

}
