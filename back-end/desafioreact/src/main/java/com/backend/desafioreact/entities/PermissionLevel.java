package com.backend.desafioreact.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_permissionlevel")
public class PermissionLevel {

	@Id
	@Column(name = "id_permissionlevel")
	private Integer id;

	@Column(name = "tx_description", nullable = false, unique = true)
	private String description;

}
