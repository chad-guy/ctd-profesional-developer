package com.app.hotelapp.services;

import com.app.hotelapp.dto.LoginDTO;
import com.app.hotelapp.dto.UsuarioDTO;
import com.app.hotelapp.models.Usuario;
import com.app.hotelapp.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private FileStorageService fileStorageService;

  public Usuario registrar(UsuarioDTO usuarioDTO) {
    if (usuarioRepository.findByEmail(usuarioDTO.getEmail()) != null) {
      throw new RuntimeException("El email ya está registrado");
    }

    Usuario usuario = new Usuario();
    usuario.setNombre(usuarioDTO.getNombre());
    usuario.setApellido(usuarioDTO.getApellido());
    usuario.setEmail(usuarioDTO.getEmail());
    usuario.setPassword(usuarioDTO.getPassword());

    return usuarioRepository.save(usuario);
  }

  public Usuario login(LoginDTO loginDTO) {
    Usuario usuario = usuarioRepository.findByEmail(loginDTO.getEmail());
    if (usuario != null && usuario.getPassword().equals(loginDTO.getPassword())) {
      return usuario;
    }
    return null;
  }

  public Usuario actualizarFotoPerfil(Long usuarioId, MultipartFile foto) {
    Usuario usuario = usuarioRepository.findById(usuarioId)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    String nombreArchivo = fileStorageService.guardarFoto(foto);
    usuario.setFotoPerfil(nombreArchivo);

    return usuarioRepository.save(usuario);
  }

  public Usuario obtenerPorId(Long id) {
    return usuarioRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
  }

  public Usuario obtenerPorEmail(String email) {
    Usuario usuario = usuarioRepository.findByEmail(email);
    if (usuario == null) {
      throw new RuntimeException("Usuario no encontrado");
    }
    return usuario;
  }

  public List<Usuario> obtenerTodos() {
    return usuarioRepository.findAll();
  }
}
