package com.app.hotelapp.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private String nombre;
    private String apellido;
    private String email;
    private String password;
}
