package com.example.hr_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hr_management.model.Employee;
import com.example.hr_management.repositories.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  public Employee addEmployee(Employee employee) {
    return employeeRepository.save(employee);
  }

  public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  public Optional<Employee> getEmployeeById(Long id) {
    return employeeRepository.findById(id);
  }

  public void deleteEmployee(Long id) {
    employeeRepository.deleteById(id);
  }

  public Long getEmployeesCount() {
    return employeeRepository.count();
  }
}
