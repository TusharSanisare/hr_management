package com.example.hr_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.example.hr_management.model.Document;
import com.example.hr_management.service.DocumentService;

import java.net.MalformedURLException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

  @Autowired
  private DocumentService documentService;

  // private final String uploadDir = "uploads/";

  @GetMapping
  public List<Document> getAllDocuments() {
    return documentService.getAllDocuments();
  }

  @GetMapping("/{employeeId}")
  public List<Document> getAllDocumentsByEmployeeId(@PathVariable Long employeeId) {
    return documentService.getDocumentsByEmployeeId(employeeId);
  }

  @PostMapping
  public ResponseEntity<Document> addDocument(@RequestBody Document document) {
    Document savedDoc = documentService.addDocument(document);
    return ResponseEntity.ok(savedDoc);
  }

  @PostMapping("/list")
  public ResponseEntity<Integer> addListDocument(@RequestBody List<Document> documents) {
    int status = documentService.addListDocument(documents);
    return ResponseEntity.ok(status);
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadDocument(
      @RequestParam("documentName") String documentName,
      @RequestParam("file") MultipartFile file,
      @RequestParam("employeeId") Long employeeId) {
    try {
      // Store the file and save document details in the database
      documentService.saveDocument(documentName, file, employeeId);
      return ResponseEntity.ok("Document uploaded successfully.");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Failed to upload document.");
    }
  }

  private final String uploadDir = "C:/Users/DICE/Downloads/hr_management/uploads/";

  // Other methods...

  @GetMapping("/files/{fileName}")
  public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
    try {
      // Correctly resolve the file path
      Path filePath = Paths.get(uploadDir, fileName).normalize(); // Use absolute path
      Resource resource = new UrlResource(filePath.toUri());

      if (resource.exists() && resource.isReadable()) {
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (MalformedURLException e) {
      return ResponseEntity.badRequest().build();
    }
  }
}
