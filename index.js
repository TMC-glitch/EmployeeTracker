const inquirer = require("inquirer");
const connection = require("./db/connection");
require("console.table");

const showMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: [
                {
                    name: "view all employees",
                    value: "view all employees",
                },
                {
                    name: "view all roles",
                    value: "view all roles",
                },
                {
                    name: "view all departments",
                    value: "view all departments",
                },
                {
                    name: "create employee",
                    value: "create employee",
                },
                {
                    name: "create role",
                    value: "create role",
                },
                {
                    name: "create department",
                    value: "create department",
                },
                {
                    name: "remove employee",
                    value: "remove employee"
                },
                {
                    name: "remove department",
                    value: "remove department"
                },
                {
                    name: "exit",
                    value: "exit"
                },
            ]
        }
    ]).then(res => {
        console.log(res.selection);
        switch (res.selection) {
            case "view all employees":
                return viewAllEmployees();
            case "view all roles":
                return viewAllRoles();
            case "view all departments":
                return viewAllDepartments();
            case "create employee":
                return createEmployee();
            case "create role":
                return createRole();
            case "create department":
                return createDepartment();
            case "remove employee":
                return removeEmployee();
            case "remove department":
                return removeDepartment();
            case "exit":
                console.log("Goodbye")
                connection.end();
                break;
        }
    })
}
const viewAllEmployees = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu();
    });
};
const viewAllRoles = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu();
    });
};
const viewAllDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu();
    });
};

const createDepartment = () => {
    inquirer.prompt([
        {
            name: "newdepo",
            message: "Name the new department?"
        }
    ]).then(({ newdepo }) => {
        let queryString = `
        INSERT INTO departments (name)`

        connection.query(queryString, [newdepo], (err, data) => {
            if (err) throw err;
            console.log('New Department was added!');
            showMenu()
        });
    });
};
const createRole = () => {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'What is the new role id?',
            },
            {
                name: 'title',
                type: 'input',
                message: 'What is the new role title?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the new role salary?',
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the department ID?',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    id: answer.id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('New role was added successfully!');
                    runSearch();
                }
            );
        });
};

const createEmployee = () => {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the employee's id number?",
            },
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "role_id",
                type: "choice",
                message: "What is the role ID for the employee?",
            },
            {
                name: "manager_id",
                type: "choice",
                message: "What is the manager's ID?",
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    id: answer.id,
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log("The new employee was added!");
                    showMenu();
                }
            );
        });
};
const run = () => {
    console.log("employee tracker");
    showMenu();
}
run();

// function exit() {
//     console.log("Goodbye.");
//     connection.end();
// }
