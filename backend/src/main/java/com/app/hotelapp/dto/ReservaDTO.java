package com.app.hotelapp.dto;

import lombok.Data;
import java.util.Date;

@Data
public class ReservaDTO {
  private Long usuarioId;
  private Long productoId;
  private Date fechaInicio;
  private Date fechaFin;
}
