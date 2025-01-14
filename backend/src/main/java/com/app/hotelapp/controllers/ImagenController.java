package com.app.hotelapp.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/imagenes")
public class ImagenController {

  private final Path root = Paths.get("uploads");

  @GetMapping("/perfil/{nombreImagen}")
  public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombreImagen) {
    try {
      Path file = root.resolve(nombreImagen);
      Resource resource = new UrlResource(file.toUri());

      if (resource.exists() || resource.isReadable()) {
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(resource);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }
}
