package com.backend.desafioreact.service.impl;

import static com.backend.desafioreact.constants.StringConstants.ARQUIVO_NAO_EXISTE;
import static com.backend.desafioreact.constants.StringConstants.ARQUIVO_NAO_PODE_SER_LIDO;
import static com.backend.desafioreact.constants.StringConstants.EMPTY_STRING;
import static com.backend.desafioreact.constants.StringConstants.ERRO_ADQUIRIR_IMAGEM;
import static com.backend.desafioreact.constants.StringConstants.SALVOU_IMAGEM_CAMINHO;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.desafioreact.dtos.UserDTO;
import com.backend.desafioreact.entities.User;
import com.backend.desafioreact.repository.UserRepository;
import com.backend.desafioreact.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<UserDTO> getByName(String name) {

		List<UserDTO> userList = userRepository.findAllByNameContaining(name).stream().map(user -> {

			UserDTO userDTO = modelMapper.map(user, UserDTO.class);
			userDTO.setImage(getImage(user.getImage()));

			return userDTO;
		}).toList();

		return userList;
	}

	@Override
	public List<UserDTO> getAll() {

		List<UserDTO> userList = userRepository.findAll().stream().map(user -> {

			UserDTO userDTO = modelMapper.map(user, UserDTO.class);
			userDTO.setImage(getImage(user.getImage()));

			return userDTO;
		}).toList();

		return userList;
	}

	@Override
	@Transactional
	public void updateUser(UserDTO userDTO) throws IOException {

		User newUser = modelMapper.map(userDTO, User.class);

		if (userDTO.getImage() != null) {
			byte[] imageBytes = Base64.getDecoder().decode(userDTO.getImage());

			Path path = Paths.get(System.getProperty("user.dir"), "upload-dir", userDTO.getUsername() + ".jpg");

			Files.createDirectories(path.getParent());
			Files.write(path, imageBytes);

			System.out.println(SALVOU_IMAGEM_CAMINHO + path.toString());

			newUser.setImage(path.toString());
		}

		userRepository.save(newUser);
	}

	@Override
	@Transactional
	public void createUser(UserDTO userDTO) throws Exception {

		User newUser = modelMapper.map(userDTO, User.class);

		if (userDTO.getImage() != null) {
			byte[] imageBytes = Base64.getDecoder().decode(userDTO.getImage());

			Path path = Paths.get(System.getProperty("user.dir"), "upload-dir", userDTO.getUsername() + ".jpg");

			Files.createDirectories(path.getParent());
			Files.write(path, imageBytes);

			System.out.println(SALVOU_IMAGEM_CAMINHO + path.toString());

			newUser.setImage(path.toString());
		}

		newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

		userRepository.save(newUser);

	}

	@Override
	public void deletUser(Integer id) {

		userRepository.deleteById(id);
	}

	@Override
	public boolean isUsernameOrEmailExists(String username, String email) {

		return userRepository.existsByUsername(username) || userRepository.existsByEmail(email);
	}

	private String getImage(String image) {

		try {

			Path path = Paths.get(image);

			if (!Files.exists(path)) {

				System.out.println(ARQUIVO_NAO_EXISTE + path);

				return EMPTY_STRING;
			}

			if (!Files.isReadable(path)) {

				System.out.println(ARQUIVO_NAO_PODE_SER_LIDO + path);

				return EMPTY_STRING;
			}

			byte[] imageBytes = Files.readAllBytes(path);

			return Base64.getEncoder().encodeToString(imageBytes);

		} catch (Exception e) {

			System.out.println(ERRO_ADQUIRIR_IMAGEM + e);

			return EMPTY_STRING;
		}
	}
}
