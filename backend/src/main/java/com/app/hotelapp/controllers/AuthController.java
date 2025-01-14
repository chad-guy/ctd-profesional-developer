package com.app.hotelapp.controllers;

import com.app.hotelapp.dto.LoginDTO;
import com.app.hotelapp.dto.UsuarioDTO;
import com.app.hotelapp.models.Usuario;
import com.app.hotelapp.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  @Autowired
  private UsuarioService usuarioService;

  @PostMapping("/registro")
  public ResponseEntity<?> registro(@RequestBody UsuarioDTO usuarioDTO) {
    Usuario usuario = usuarioService.registrar(usuarioDTO);
    return ResponseEntity.ok(usuario);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
    Usuario usuario = usuarioService.login(loginDTO);
    if (usuario != null) {
      return ResponseEntity.ok(usuario);
    }
    return ResponseEntity.badRequest().body("Credenciales inválidas");
  }

  @PostMapping(value = "/foto-perfil/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> actualizarFotoPerfil(
      @PathVariable("id") Long id,
      @RequestParam("foto") MultipartFile foto) {
    try {
      if (foto.isEmpty()) {
        return ResponseEntity.badRequest().body("Por favor seleccione un archivo");
      }
      Usuario usuario = usuarioService.actualizarFotoPerfil(id, foto);
      return ResponseEntity.ok(usuario);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error al subir archivo: " + e.getMessage());
    }
  }

  @GetMapping("/usuario/{id}")
  public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
    try {
      return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/usuario/email/{email}")
  public ResponseEntity<?> obtenerPorEmail(@PathVariable String email) {
    try {
      return ResponseEntity.ok(usuarioService.obtenerPorEmail(email));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/usuarios")
  public ResponseEntity<?> obtenerTodos() {
    return ResponseEntity.ok(usuarioService.obtenerTodos());
  }
}
