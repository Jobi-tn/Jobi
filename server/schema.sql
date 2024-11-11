-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema jobi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jobi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `jobi` ;

-- -----------------------------------------------------
-- Table `jobi`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobi`.`employees` (
  `idemployees` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `pic` LONGTEXT NULL,
  `skills` VARCHAR(255) NULL,
  `experience` INT NULL,
  `age` INT NULL,
  `education` VARCHAR(255) NULL,
  `location` VARCHAR(255) NULL,
  `phone_number` INT NULL,
  `rating` INT NULL,
  PRIMARY KEY (`idemployees`),
  UNIQUE INDEX `idemployees_UNIQUE` (`idemployees` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobi`.`employers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobi`.`employers` (
  `idemployers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `owner` VARCHAR(255) NULL,
  `matricule_fiscale` INT NOT NULL,
  `location` VARCHAR(255) NULL,
  `phone_number` INT NULL,
  `description` VARCHAR(255) NULL,
  `field` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idemployers`),
  UNIQUE INDEX `idemployers_UNIQUE` (`idemployers` ASC) VISIBLE,
  UNIQUE INDEX `matricule_fiscale_UNIQUE` (`matricule_fiscale` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobi`.`joboffers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobi`.`joboffers` (
  `idjobposts` INT NOT NULL AUTO_INCREMENT,
  `position` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  `experience` INT NULL,
  `employers_idemployers` INT NOT NULL,
  `status` TINYINT NULL,
  PRIMARY KEY (`idjobposts`),
  UNIQUE INDEX `idjobposts_UNIQUE` (`idjobposts` ASC) VISIBLE,
  INDEX `fk_joboffers_employers1_idx` (`employers_idemployers` ASC) VISIBLE,
  CONSTRAINT `fk_joboffers_employers1`
    FOREIGN KEY (`employers_idemployers`)
    REFERENCES `jobi`.`employers` (`idemployers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobi`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobi`.`posts` (
  `idposts` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `description` LONGTEXT NULL,
  `employees_idemployees` INT NULL,
  `employers_idemployers` INT NULL,
  PRIMARY KEY (`idposts`),
  UNIQUE INDEX `idposts_UNIQUE` (`idposts` ASC) VISIBLE,
  INDEX `fk_posts_employees1_idx` (`employees_idemployees` ASC) VISIBLE,
  INDEX `fk_posts_employers1_idx` (`employers_idemployers` ASC) VISIBLE,
  CONSTRAINT `fk_posts_employees1`
    FOREIGN KEY (`employees_idemployees`)
    REFERENCES `jobi`.`employees` (`idemployees`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_posts_employers1`
    FOREIGN KEY (`employers_idemployers`)
    REFERENCES `jobi`.`employers` (`idemployers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobi`.`applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobi`.`applications` (
  `idapplications` INT NOT NULL AUTO_INCREMENT,
  `joboffers_idjobposts` INT NOT NULL,
  `employees_idemployees` INT NOT NULL,
  `status` TINYINT NULL,
  PRIMARY KEY (`idapplications`),
  UNIQUE INDEX `idapplications_UNIQUE` (`idapplications` ASC) VISIBLE,
  INDEX `fk_applications_joboffers_idx` (`joboffers_idjobposts` ASC) VISIBLE,
  INDEX `fk_applications_employees1_idx` (`employees_idemployees` ASC) VISIBLE,
  CONSTRAINT `fk_applications_joboffers`
    FOREIGN KEY (`joboffers_idjobposts`)
    REFERENCES `jobi`.`joboffers` (`idjobposts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_applications_employees1`
    FOREIGN KEY (`employees_idemployees`)
    REFERENCES `jobi`.`employees` (`idemployees`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jobi`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobi`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NULL,
  `posts_idposts` INT NOT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `fk_comments_posts1_idx` (`posts_idposts` ASC) VISIBLE,
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`posts_idposts`)
    REFERENCES `jobi`.`posts` (`idposts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
