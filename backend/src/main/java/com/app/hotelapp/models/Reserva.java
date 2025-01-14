package com.app.hotelapp.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "reservas")
public class Reserva {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false)
  private Usuario usuario;

  @ManyToOne
  @JoinColumn(name = "producto_id", nullable = false)
  private Producto producto;

  @Temporal(TemporalType.DATE)
  private Date fechaInicio;

  @Temporal(TemporalType.DATE)
  private Date fechaFin;

  @Temporal(TemporalType.TIMESTAMP)
  private Date fechaCreacion = new Date();

  private String estado = "PENDIENTE"; // PENDIENTE, CONFIRMADA, CANCELADA
}
