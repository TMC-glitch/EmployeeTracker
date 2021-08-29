USE employee_tracker;
INSERT INTO department(name)
VALUES("Stock"),("Pack"),("Pick");
INSERT INTO role(title, salary, department_id)
VALUES("Stocker", 30000, 1),("Packer", 30000, 2), ("Picker", 30000, 3);
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Kris", "Jenkins", 2, null),("LeBron","James", 1, 1),("Scottie", "Pippen", 3, 2);
