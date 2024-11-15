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


-- Insert data into employees table
INSERT INTO employees (mail, password, name, lastname, pic, skills, experience, age, education, location, phone_number, rating) VALUES
('john.doe@example.com', 'password123', 'John', 'Doe', NULL, 'JavaScript, React', 5, 30, 'Bachelor of Science', 'New York', 1234567890, 4),
('jane.smith@example.com', 'password456', 'Jane', 'Smith', NULL, 'Python, Django', 3, 28, 'Master of Science', 'Los Angeles', 9876543210, 5);

-- Insert data into employers table
INSERT INTO employers (name, owner, matricule_fiscale, location, phone_number, description, field, email, password) VALUES
('Tech Corp', 'Alice Johnson', 123456789, 'San Francisco', 1234567890, 'A leading tech company', 'Technology', 'contact@techcorp.com', 'employerpass'),
('Health Inc', 'Bob Brown', 987654321, 'Chicago', 9876543210, 'Healthcare solutions provider', 'Healthcare', 'info@healthinc.com', 'employerpass');

-- Insert data into joboffers table
INSERT INTO joboffers (position, description, experience, employers_idemployers, status) VALUES
('Frontend Developer', 'Looking for a skilled frontend developer with experience in React.', 2, 1, 1),
('Backend Developer', 'Seeking a backend developer proficient in Node.js and Express.', 3, 1, 1),
('Data Analyst', 'Join our team as a data analyst to help us make data-driven decisions.', 1, 2, 1);

-- Insert data into posts table
INSERT INTO posts (title, description, employees_idemployees, employers_idemployers) VALUES
('Post about React', 'This is a post discussing the benefits of using React for web development.', 1, 1),
('Post about Python', 'A post sharing insights on Python programming and its applications.', 2, 2);

-- Insert data into applications table
INSERT INTO applications (joboffers_idjobposts, employees_idemployees, status) VALUES
(1, 1, 1),
(2, 1, 0),
(3, 2, 1);

-- Insert data into comments table
INSERT INTO comments (content, posts_idposts) VALUES
('Great insights on React!', 1),
('I love Python, thanks for sharing!', 2);

INSERT INTO jobi.employees (mail, password, name, lastname, pic, skills, experience, age, education, location, phone_number, rating) VALUES
('johndoe@example.com', 'password123', 'John', 'Doe', NULL, 'Java, SQL', 5, 30, 'Bachelor of Science', 'New York', 1234567890, 4),
('janedoe@example.com', 'password123', 'Jane', 'Doe', NULL, 'Python, HTML', 3, 28, 'Master of Science', 'Los Angeles', 987654321, 5);

-- Insert dummy data for employers table
INSERT INTO jobi.employers (name, owner, matricule_fiscale, location, phone_number, description, field, email, password) VALUES
('Tech Solutions Inc.', 'Alice Smith', 123456789, 'San Francisco', 1122334455, 'A tech company specializing in software development.', 'Technology', 'techsolutions@example.com', 'pass456'),
('Green Gardens Ltd.', 'Bob Johnson', 987654321, 'Chicago', 5566778899, 'A landscaping and garden maintenance company.', 'Landscaping', 'greengardens@example.com', 'pass789');

-- Insert dummy data for joboffers table
INSERT INTO jobi.joboffers (position, description, experience, employers_idemployers, status) VALUES
('Software Engineer', 'Develop and maintain software applications.', 3, 1, 1),
('Gardener', 'Maintain and care for gardens and landscapes.', 2, 2, 1);
-- Insert dummy data for posts table
INSERT INTO jobi.posts (title, description, employees_idemployees, employers_idemployers) VALUES
('Looking for a Job', 'I am a software engineer looking for a new opportunity.', 1, NULL),
('Hiring Now!', 'We are looking for experienced gardeners.', NULL, 2);

-- Insert dummy data for applications table
INSERT INTO jobi.applications (joboffers_idjobposts, employees_idemployees, status) VALUES
(1, 1, 1),
(2, 2, 0);

-- Insert dummy data for comments table
INSERT INTO jobi.comments (content, posts_idposts) VALUES
('This sounds like a great job opportunity!', 1),
('We are very interested in your profile.', 2);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
