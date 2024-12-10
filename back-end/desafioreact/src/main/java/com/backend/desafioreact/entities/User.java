package com.backend.desafioreact.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id_user")
	private Integer id;

	@Column(name = "tx_image")
	private String image;

	@Column(name = "tx_name", nullable = false)
	private String name;

	@Column(name = "tx_email", nullable = false, unique = true)
	private String email;

	@Column(name = "tx_username", nullable = false, unique = true)
	private String username;

	@Column(name = "tx_password", nullable = false)
	private String password;

	@Column(name = "tx_phone")
	private String phone;

	@Column(name = "fl_active", nullable = false)
	private Boolean isActive;

	@Column(name = "cd_permissionlevel", nullable = false)
	private Integer permissionLevel;

}
