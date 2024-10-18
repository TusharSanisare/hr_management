package com.example.hr_management.model;

import java.time.LocalDateTime;
// import java.util.List;
// import com.fasterxml.jackson.annotation.JsonManagedReference;
// import jakarta.persistence.CascadeType;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.OneToMany;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long Id;

  private String name;
  private String email;
  private String phone;
  private String jobRole;
  private Double salary;
  private String performanceHistory = "Neutral";
  private String documentUrl;

  @Column(columnDefinition = "TIMESTAMP")
  private LocalDateTime created_date = LocalDateTime.now();

  // @JsonManagedReference
  // @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
  // "employee")
  // private List<Document> documents;

  // Getters and Setters
}
