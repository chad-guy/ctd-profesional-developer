package com.app.hotelapp.services;

import com.app.hotelapp.dto.ReservaDTO;
import com.app.hotelapp.models.Reserva;
import com.app.hotelapp.models.Usuario;
import com.app.hotelapp.models.Producto;
import com.app.hotelapp.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

  @Autowired
  private ReservaRepository reservaRepository;

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private ProductoService productoService;

  public Reserva crear(ReservaDTO reservaDTO) {
    // Verificar disponibilidad
    List<Reserva> reservasExistentes = reservaRepository.findReservasEntreFechas(
        reservaDTO.getProductoId(),
        reservaDTO.getFechaInicio(),
        reservaDTO.getFechaFin());

    if (!reservasExistentes.isEmpty()) {
      throw new RuntimeException("El producto no está disponible en esas fechas");
    }

    Usuario usuario = usuarioService.obtenerPorId(reservaDTO.getUsuarioId());
    Producto producto = productoService.obtenerPorId(reservaDTO.getProductoId());

    Reserva reserva = new Reserva();
    reserva.setUsuario(usuario);
    reserva.setProducto(producto);
    reserva.setFechaInicio(reservaDTO.getFechaInicio());
    reserva.setFechaFin(reservaDTO.getFechaFin());

    return reservaRepository.save(reserva);
  }

  public List<Reserva> obtenerReservasUsuario(Long usuarioId) {
    return reservaRepository.findByUsuarioId(usuarioId);
  }

  public void cancelarReserva(Long reservaId) {
    Reserva reserva = reservaRepository.findById(reservaId)
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
    reserva.setEstado("CANCELADA");
    reservaRepository.save(reserva);
  }
}
