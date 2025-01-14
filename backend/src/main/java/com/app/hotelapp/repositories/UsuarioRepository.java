package com.app.hotelapp.repositories;

import com.app.hotelapp.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Usuario findByEmail(String email);
}
