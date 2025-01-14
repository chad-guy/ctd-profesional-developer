package com.app.hotelapp.repositories;

import com.app.hotelapp.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
  List<Reserva> findByUsuarioId(Long usuarioId);

  @Query("SELECT r FROM Reserva r WHERE r.producto.id = ?1 AND " +
      "((r.fechaInicio BETWEEN ?2 AND ?3) OR " +
      "(r.fechaFin BETWEEN ?2 AND ?3))")
  List<Reserva> findReservasEntreFechas(Long productoId, Date inicio, Date fin);
}
