package com.acc.main.repositories;

import org.springframework.data.repository.CrudRepository;

import com.acc.main.entities.TaskList;

public interface TaskListRepository extends CrudRepository<TaskList, Long> {

}
