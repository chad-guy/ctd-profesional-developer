package com.app.hotelapp.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileStorageService {
  private final Path root = Paths.get("uploads");

  public FileStorageService() {
    try {
      if (!Files.exists(root)) {
        Files.createDirectory(root);
      }
    } catch (IOException e) {
      throw new RuntimeException("No se pudo crear el directorio de uploads");
    }
  }

  public String guardarFoto(MultipartFile file) {
    try {
      // Obtener la extensión del archivo original
      String extension = file.getOriginalFilename().substring(
          file.getOriginalFilename().lastIndexOf("."));

      // Crear nombre con formato: yyyyMMdd_HHmmss
      String timestamp = LocalDateTime.now().format(
          DateTimeFormatter.ofPattern("yyyyMMdd_HHmmssSSS"));

      String filename = timestamp + extension;

      Files.copy(file.getInputStream(), this.root.resolve(filename));
      return filename;
    } catch (IOException e) {
      throw new RuntimeException("No se pudo guardar el archivo");
    }
  }
}
