package com.app.hotelapp.controllers;

import com.app.hotelapp.dto.ReservaDTO;
import com.app.hotelapp.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

  @Autowired
  private ReservaService reservaService;

  @PostMapping
  public ResponseEntity<?> crear(@RequestBody ReservaDTO reservaDTO) {
    try {
      return ResponseEntity.ok(reservaService.crear(reservaDTO));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/usuario/{usuarioId}")
  public ResponseEntity<?> obtenerReservasUsuario(@PathVariable Long usuarioId) {
    return ResponseEntity.ok(reservaService.obtenerReservasUsuario(usuarioId));
  }

  @PutMapping("/cancelar/{reservaId}")
  public ResponseEntity<?> cancelarReserva(@PathVariable Long reservaId) {
    try {
      reservaService.cancelarReserva(reservaId);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
