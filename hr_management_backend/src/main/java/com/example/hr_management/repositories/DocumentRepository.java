package com.example.hr_management.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.hr_management.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {

  // List<Document> findByEmployeeId(Long employeeId);

  List<Document> findByEmployeeId(Long employeeId);

}
