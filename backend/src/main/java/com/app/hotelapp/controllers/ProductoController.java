package com.app.hotelapp.controllers;

import com.app.hotelapp.dto.ProductoDTO;
import com.app.hotelapp.models.Producto;
import com.app.hotelapp.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

  @Autowired
  private ProductoService productoService;

  @GetMapping
  public ResponseEntity<?> obtenerTodos() {
    return ResponseEntity.ok(productoService.obtenerTodos());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
    return ResponseEntity.ok(productoService.obtenerPorId(id));
  }

  @PostMapping
  public ResponseEntity<?> crear(@RequestBody ProductoDTO productoDTO) {
    return ResponseEntity.ok(productoService.crear(productoDTO));
  }

  @PostMapping(value = "/imagen/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> actualizarImagen(
      @PathVariable Long id,
      @RequestParam("imagen") MultipartFile imagen) {
    return ResponseEntity.ok(productoService.actualizarImagen(id, imagen));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> eliminar(@PathVariable Long id) {
    productoService.eliminar(id);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
    try {
      Producto productoActualizado = productoService.actualizar(id, productoDTO);
      return ResponseEntity.ok(productoActualizado);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
