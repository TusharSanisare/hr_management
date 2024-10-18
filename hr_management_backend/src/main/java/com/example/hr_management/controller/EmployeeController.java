package com.example.hr_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.hr_management.model.Employee;
import com.example.hr_management.service.EmployeeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @PostMapping
  public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
    Employee savedEmployee = employeeService.addEmployee(employee);
    return ResponseEntity.ok(savedEmployee);
  }

  @GetMapping
  public ResponseEntity<List<Employee>> getAllEmployees() {
    List<Employee> employees = employeeService.getAllEmployees();
    return ResponseEntity.ok(employees);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
    Optional<Employee> employee = employeeService.getEmployeeById(id);
    return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/count")
  public ResponseEntity<Long> getEmployeesCount() {
    Long employeeCount = employeeService.getEmployeesCount();
    return ResponseEntity.ok(employeeCount);
  }

  @GetMapping("/present")
  public ResponseEntity<Long> getPresentEmployeesCount() {
    // Long employeeCount = employeeService.getEmployeesCount();
    return ResponseEntity.ok(4L);
  }

  @GetMapping("/absent")
  public ResponseEntity<Long> getAbsentEmployeesCount() {
    // Long employeeCount = employeeService.getEmployeesCount();
    return ResponseEntity.ok(2L);
  }

  @GetMapping("/leave")
  public ResponseEntity<Long> getOnLeaveEmployeesCount() {
    // Long employeeCount = employeeService.getEmployeesCount();
    return ResponseEntity.ok(1L);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
    employeeService.deleteEmployee(id);
    return ResponseEntity.noContent().build();
  }
}
