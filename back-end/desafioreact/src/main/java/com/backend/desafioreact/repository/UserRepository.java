package com.backend.desafioreact.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.backend.desafioreact.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	@Override
	public List<User> findAll();

	public List<User> findAllByNameContaining(String name);

	public boolean existsByUsername(String username);

	public boolean existsByEmail(String email);
}
