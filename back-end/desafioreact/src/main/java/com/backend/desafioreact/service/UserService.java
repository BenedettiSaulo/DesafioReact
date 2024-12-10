package com.backend.desafioreact.service;

import java.util.List;

import com.backend.desafioreact.dtos.UserDTO;

public interface UserService {

	public List<UserDTO> getAll();

	public List<UserDTO> getByName(String name);

	public void createUser(UserDTO userDTO) throws Exception;

	public void updateUser(UserDTO userDTO) throws Exception;

	public void deletUser(Integer id);

	public boolean isUsernameOrEmailExists(String username, String email);
}
