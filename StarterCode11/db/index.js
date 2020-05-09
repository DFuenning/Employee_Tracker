const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  findAllDepartments() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  findAllRoles() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title AS role, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }


  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  // Create a new department
  createDepartment(departmentId) {
    return this.connection.query("INSERT INTO role set ?", departmentId)
  }

  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }
  // Remove a role from the db
  removeRole(roleId) {
    return this.connection.query(
      "DELETE role_id FROM employee WHERE id = ?",
      roleId
    );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Update the given employee's Manager
  updateEmployeeRole(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }
  // Remove a department
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM employee WHERE department_id = ?",
      departmentId
    );
  }



  // Find all employees except the given employee id


  // Find all roles, join with departments to display the department name

  // Create a new role



  // Find all departments, join with employees and roles and sum up utilized department budget
  // QUERY = "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee 
  //LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"





  // Find all employees in a given department, join with roles to display role titles

  // Find all employees by manager, join with departments and roles to display titles and department names
}
module.exports = new DB(connection);