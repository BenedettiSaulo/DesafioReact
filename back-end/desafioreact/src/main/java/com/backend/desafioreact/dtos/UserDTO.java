package com.backend.desafioreact.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

	private Integer id;

	private String image;

	private String name;

	private String email;

	private String username;

	private String password;

	private String phone;

	private Boolean isActive;

	private Integer permissionLevel;
}
