const {
  prompt
} = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({
    name: "Employee Manager"
  }).render();

  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const {
    choice
  } = await prompt([{
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [{
        name: "View All Employees",
        value: "VIEW_EMPLOYEES"
      },
      {
        name: "View Employees by Departments",
        value: "VIEW_EMPLOYEES_DEPARTMENTS"
      },
      {
        name: "View All Roles",
        value: "VIEW_ROLES"
      },
      {
        name: "View Employees by Manager",
        value: "EMPLOYEE_BY_MANAGER"
      },
      {
        name: "Add an Employee",
        value: "ADD_EMPLOYEE"
      },
      {
        name: "Add a Department",
        value: "ADD_DEPARTMENT"
      },
      {
        name: "Remove an Employee",
        value: "REMOVE_EMPLOYEE"
      },
      {
        name: "Remove a Role",
        value: "REMOVE_ROLE"
      },
      {
        name: "Remove a Department",
        value: "REMOVE_DEPARTMENT"
      },
      {
        name: "Update an Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
      },
      {
        name: "Update an Employee's Manager",
        value: "UPDATE_EMPLOYEE_MANAGER"
      },
      {
        name: "View the Budget by Department",
        value: "VIEW_BUDGET"
      },
      {
        name: "Quit",
        value: "QUIT"
      }
    ]
  }]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    // view section
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_ROLES":
      return viewRoles();
    case "VIEW_EMPLOYEES_DEPARTMENTS":
      return viewEmployeeByDepartments();
    case "EMPLOYEE_BY_MANAGER":
      return viewByManager();
    case "VIEW_BUDGET":
      return viewBudget();
      // add section
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "ADD_ROLE":
      return addRole();
    case "ADD_DEPARTMENT":
      return addDepartments();
      // remove section 
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "REMOVE_ROLE":
      return removeRole();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
      // update and view section
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
      // break case statement
    default:
      return quit();
  }
}
//save
async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}
//Create viewEmployeesByDepartment function
async function viewEmployeeByDepartments() {
  const departments = await db.findAllDepartments();

  const departmentsChoice = departments.map(({
    id,
    name
  }) => ({
    name: name,
    value: id
  }));

  const {
    departmentsID
  } = await prompt([{
    type: "list",
    name: "departmentsID",
    message: "What department would you like to choose?",
    choices: departmentsChoice
  }]);
  const employees = await db.findEmployeeByDepartments();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}
//Create viewRoles function
async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

//Create viewEmployeesByDepartment function
async function viewEmployees() {
  const departments = await db.findAllDepartments();

  const departmentsChoice = departments.map(({
    id,
    name
  }) => ({
    name: name,
    value: id
  }));

  const {
    departmentsID
  } = await prompt([{
    type: "list",
    name: "departmentsID",
    message: "What department would you like to choose?",
    choices: departmentsChoice
  }]);
  const employees = await db.findEmployeeByDepartments();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}


//save
async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "Which employee do you want to remove?",
    choices: employeeChoices
  }]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadMainPrompts();
}
//Create removeDepartment function
async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({
    id,
    department_id,
  }) => ({
    name: `${name}`,
    value: id
  }));

  const {
    departmentId
  } = await prompt([{
    type: "list",
    name: "deleteDept",
    message: "Which department do you want to remove?",
    choices: departmentChoices
  }]);

  await db.removeDepartment(departmentId);

  console.log("Removed Department from the database");

  loadMainPrompts();
}

//save
async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "Which employee's role do you want to update?",
    choices: employeeChoices
  }]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id
  }));

  const {
    roleId
  } = await prompt([{
    type: "list",
    name: "roleId",
    message: "Which role do you want to assign the selected employee?",
    choices: roleChoices
  }]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

//Create updateEmployeeManager function
async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "Which employee's manager do you want to update?",
    choices: employeeChoices
  }]);

  const managers = await db.viewAllManagers(employeeId);

  const managerChoices = managers.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const {
    managerId
  } = await prompt([{
    type: "list",
    name: "managerId",
    message: "Who is their new manager?",
    choices: managerChoices
  }]);

  await db.updateEmployeeManager(employeeId, managerId);

  console.log("Updated employee's Manager");

  loadMainPrompts();
}



//Create removeRole function





//save
async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([{
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id
  }));

  const {
    roleId
  } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({
    name: "None",
    value: null
  });

  const {
    managerId
  } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadMainPrompts();
}

//Create addRole function

async function addRole() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }))

  const role = await prompt([{
      name: "title",
      message: "What is the title of this new role?"
    },
    {
      name: "salary",
      message: "What the salary of this role?"
    },
    {
      type: "list",
      name: "department",
      message: "Which department would you like to place this role?",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);
  
  console.log(`${role.title} Has been added to the department!`)

  loadMainPrompts();
}
//Create addDepartment function
async function addDepartment() {

  
  const department = await prompt([{
      name: "department",
      message: "What is the name of the department would you like to create?"
    }
  ]);

  await db.createDepartment(department);
  
  console.log(`${department.name} Department has been created!`)

  loadMainPrompts();
}



function quit() {
  console.log("Goodbye!");
  process.exit();
}