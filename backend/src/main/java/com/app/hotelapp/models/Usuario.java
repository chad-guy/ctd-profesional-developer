package com.app.hotelapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nombre;

  private String apellido;

  @Column(unique = true)
  private String email;

  private String password;

  @Column(name = "foto_perfil")
  private String fotoPerfil;
}
