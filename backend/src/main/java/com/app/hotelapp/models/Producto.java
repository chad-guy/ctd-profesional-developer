package com.app.hotelapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")
public class Producto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nombre;
  private String descripcion;
  private Double precio;
  private String imagen;
  private Boolean disponible = true;

  @Enumerated(EnumType.STRING)
  private Categoria categoria;
}
