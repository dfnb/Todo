package com.acc.main.repositories;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.acc.main.entities.TaskList;
import com.acc.main.entities.TaskListItem;

@Component
public class DatabaseLoader implements CommandLineRunner { 

	private final TaskListRepository repository;

	@Autowired 
	public DatabaseLoader(TaskListRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new TaskList(null,"coisas de casa", new ArrayList<TaskListItem>()));
	}
}

