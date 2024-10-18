package com.example.hr_management.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig implements WebMvcConfigurer {

//   @Override
//   public void addCorsMappings(CorsRegistry registry) {
//     registry.addMapping("/api/**")
//         .allowedOrigins("http://localhost:5173") // Allow the frontend's origin
//         .allowedMethods("GET", "POST", "PUT", "DELETE")
//         .allowedHeaders("*")
//         .allowCredentials(true);
//   }
// }

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**") // allow CORS for all endpoints under /api
        .allowedOrigins("*") // allow all origins or specify your front-end URL
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
  }
}
