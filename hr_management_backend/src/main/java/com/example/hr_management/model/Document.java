package com.example.hr_management.model;

import java.time.LocalDateTime;

// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Document {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String documentName;
  private String documentType;
  private String filePath;
  private Long employeeId;

  @Column(columnDefinition = "TIMESTAMP")
  private LocalDateTime created_date = LocalDateTime.now();

}
