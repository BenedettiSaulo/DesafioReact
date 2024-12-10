package com.backend.desafioreact.controller;

import static com.backend.desafioreact.constants.EndpointConstants.PATH_ALL;
import static com.backend.desafioreact.constants.EndpointConstants.PATH_BY_NAME;
import static com.backend.desafioreact.constants.EndpointConstants.PATH_CREATE;
import static com.backend.desafioreact.constants.EndpointConstants.PATH_DELET;
import static com.backend.desafioreact.constants.EndpointConstants.PATH_UPDATE;
import static com.backend.desafioreact.constants.EndpointConstants.PATH_USER;
import static com.backend.desafioreact.constants.StringConstants.ERRO_ADQUIRIR_TODOS_USUARIOS;
import static com.backend.desafioreact.constants.StringConstants.ERRO_ADQUIRIR_USUARIOS_PELO_NOME;
import static com.backend.desafioreact.constants.StringConstants.ERRO_ATUALIZAR_USUARIO;
import static com.backend.desafioreact.constants.StringConstants.ERRO_CRIAR_USUARIO;
import static com.backend.desafioreact.constants.StringConstants.USUARIOS_OU_EMAIL_JA_EXISTENTES;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.desafioreact.dtos.UserDTO;
import com.backend.desafioreact.service.UserService;

@RestController
@RequestMapping(PATH_USER)
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping(PATH_ALL)
	public ResponseEntity<List<UserDTO>> getAll() {

		try {

			return ResponseEntity.ok().body(userService.getAll());
		} catch (Exception e) {

			throw new RuntimeException(ERRO_ADQUIRIR_TODOS_USUARIOS);
		}
	}

	@GetMapping(PATH_BY_NAME)
	public ResponseEntity<List<UserDTO>> getByName(@RequestParam(name = "name") String name) {

		try {

			return ResponseEntity.ok().body(userService.getByName(name));
		} catch (Exception e) {

			throw new RuntimeException(ERRO_ADQUIRIR_USUARIOS_PELO_NOME);
		}
	}

	@PostMapping(PATH_CREATE)
	public ResponseEntity<String> createUser(@RequestBody UserDTO userDTO) throws Exception {

		try {

			if (userService.isUsernameOrEmailExists(userDTO.getUsername(), userDTO.getEmail())) {

				return ResponseEntity.badRequest().body(USUARIOS_OU_EMAIL_JA_EXISTENTES);
			}

			userService.createUser(userDTO);

			return ResponseEntity.ok().build();
		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ERRO_CRIAR_USUARIO);
		}

	}

	@PutMapping(PATH_UPDATE)
	public ResponseEntity<String> updateUser(@RequestBody UserDTO userDTO) {

		try {

			userService.updateUser(userDTO);

			return ResponseEntity.ok().build();
		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ERRO_ATUALIZAR_USUARIO);
		}
	}

	@DeleteMapping(PATH_DELET)
	public ResponseEntity<Void> deletUser(@RequestParam Integer id) {

		userService.deletUser(id);

		return ResponseEntity.noContent().build();
	}
}
