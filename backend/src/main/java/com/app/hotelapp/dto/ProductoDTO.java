package com.app.hotelapp.dto;

import lombok.Data;
import com.app.hotelapp.models.Categoria;

@Data
public class ProductoDTO {
  private String nombre;
  private String descripcion;
  private Double precio;
  private Categoria categoria;
}
