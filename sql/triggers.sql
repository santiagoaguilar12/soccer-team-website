-- DROP TRIGGER delete_from_all;

DELIMITER //

-- CREATE TRIGGER delete_from_all
--     BEFORE DELETE ON persons FOR EACH ROW   
--     BEGIN 
--         IF EXISTS (SELECT * FROM athletes where athletes.person_id = persons.id) THEN
--         DELETE FROM athletes WHERE athletes.person_id = persons.id;
--         END IF;
--         IF EXISTS (SELECT * FROM coaches where coaches.person_id = persons.id) THEN
--         DELETE FROM coaches WHERE coaches.person_id = persons.id;
--         END IF;
--         IF EXISTS (SELECT * FROM students where students.person_id = persons.id) THEN
--         DELETE FROM students WHERE students.person_id = persons.id;
--         END IF;
--     END;
    
-- //

-- DELIMITER ;