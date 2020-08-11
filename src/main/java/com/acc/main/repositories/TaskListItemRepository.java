package com.acc.main.repositories;

import org.springframework.data.repository.CrudRepository;

import com.acc.main.entities.TaskListItem;

public interface TaskListItemRepository extends CrudRepository<TaskListItem, Long> {

}
