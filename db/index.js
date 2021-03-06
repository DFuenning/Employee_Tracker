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
  viewAllDepartments() {
  return this.connection.query(
    "SELECT * FROM department"
  );
  }
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name"
    );
  }
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  viewAllManagers(employeeId) {
    return this.connection.query(
      "SELECT * FROM employee where id != ?",
      employeeId
    );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  // Create a new department
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department)
  }
  //create a new role
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role)
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
      "DELETE FROM role WHERE id = ?",
      roleId
    );
  }
  // Remove a department
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
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
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  findEmployeeByDepartments(departmentID) {
    return this.connection.query(
      "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, role.title, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id WHERE role.department_id = ?",
      departmentID
    );
  }
  findEmployeeByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, department.name, role.title, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE employee.manager_id = ?",
      managerId
    );
  }

  

 
}
module.exports = new DB(connection);