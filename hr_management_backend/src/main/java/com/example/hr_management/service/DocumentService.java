package com.example.hr_management.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.hr_management.model.Document;
import com.example.hr_management.repositories.DocumentRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path; // Correct import for Path
import java.nio.file.Paths; // Correct import for Paths
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    // private final String uploadDir = "/uploads";
    private final String uploadDir = "uploads/";

    // Save a single document object
    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }

    // Retrieve documents by employee ID
    public List<Document> getDocumentsByEmployeeId(Long employeeId) {
        return documentRepository.findByEmployeeId(employeeId);
    }

    // Retrieve all documents
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // Add a single document (duplicate of saveDocument)
    public Document addDocument(Document document) {
        return documentRepository.save(document);
    }

    // Save a list of documents
    public int addListDocument(List<Document> documents) {
        documentRepository.saveAll(documents);
        return documents.size(); // Return the number of documents saved
    }

    public void saveDocument(String documentName, MultipartFile file, Long employeeId) throws IOException {
        // Define the relative uploads path
        String uploadsDir = "C:/Users/DICE/Downloads/hr_management/hr_management_backend/src/main/resources/static/uploads";

        // Get the absolute path to the 'uploads' folder inside 'resources/static'
        Path staticResourceDir = Paths.get(uploadsDir);

        // Ensure the 'uploads' directory already exists (no need to create new
        // directories)
        if (!Files.exists(staticResourceDir)) {
            throw new IOException("Uploads directory does not exist."); // Optional error handling
        }

        // Generate a unique file name
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName != null && originalFileName.contains(".")
                ? originalFileName.substring(originalFileName.lastIndexOf("."))
                : ""; // Extract file extension
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension; // Generate a unique name with extension

        // Generate the file path and store the file in the existing static/uploads
        // folder
        Path filePath = staticResourceDir.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath);

        // Save the document details in the database, storing only the relative path
        Document document = new Document();
        document.setDocumentName(documentName);
        document.setDocumentType(file.getContentType());
        document.setFilePath("uploads/" + uniqueFileName); // Store only relative path (e.g., uploads/filename.pdf)
        document.setEmployeeId(employeeId);
        documentRepository.save(document);
    }

}
