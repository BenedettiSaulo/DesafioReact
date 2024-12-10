-- -----------------------------------------------------
-- Inserindo os valores na tabela de nivel de permissão 
-- caso ainda não exista valores
-- -----------------------------------------------------

INSERT IGNORE  INTO tb_permissionlevel (id_permissionlevel, tx_description) 
VALUES (1, 'Usuário');

INSERT IGNORE  INTO tb_permissionlevel (id_permissionlevel, tx_description) 
VALUES (2, 'Admin');
