-- -----------------------------------------------------
-- Criando as tabelas e relações
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema desafioreact
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema desafioreact
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `desafioreact` DEFAULT CHARACTER SET utf8 ;
USE `desafioreact` ;

-- -----------------------------------------------------
-- Table `desafioreact`.`tb_permissionlevel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafioreact`.`tb_permissionlevel` (
  `id_permissionlevel` INT NOT NULL COMMENT 'Código do nivel de permissão',
  `tx_description` VARCHAR(10) NOT NULL COMMENT 'Descrição do nivel de permissão',
  PRIMARY KEY (`id_permissionlevel`),
  UNIQUE INDEX `id_nivelpermissao_UNIQUE` (`id_permissionlevel` ASC),
  UNIQUE INDEX `tx_descricao_UNIQUE` (`tx_description` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `desafioreact`.`tb_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafioreact`.`tb_user` (
  `id_user` INT NOT NULL COMMENT 'Código do Usuário',
  `tx_name` VARCHAR(35) NOT NULL COMMENT 'Nome do usuário',
  `tx_username` VARCHAR(45) NOT NULL COMMENT 'Username do usuário',
  `tx_email` VARCHAR(45) NOT NULL COMMENT 'E-mail do usuário',
  `tx_password` VARCHAR(255) NOT NULL COMMENT 'Senha criptografada do usuário',
  `tx_phone` VARCHAR(20) NULL COMMENT 'Telefone do usuário',
  `fl_active` TINYINT NOT NULL COMMENT 'Flag para saber se o usuário é ativo ou não',
  `cd_permissionlevel` INT NOT NULL,
  `tx_image` VARCHAR(255) NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_user` ASC),
  UNIQUE INDEX `tx_email_UNIQUE` (`tx_email` ASC),
  UNIQUE INDEX `tx_username_UNIQUE` (`tx_username` ASC),
  INDEX `fk_tb_user_tb_permissionlevel_idx` (`cd_permissionlevel` ASC),
  CONSTRAINT `fk_tb_user_tb_permissionlevel`
    FOREIGN KEY (`cd_permissionlevel`)
    REFERENCES `desafioreact`.`tb_permissionlevel` (`id_permissionlevel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
