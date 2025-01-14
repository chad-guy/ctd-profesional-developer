package com.app.hotelapp.services;

import com.app.hotelapp.dto.ProductoDTO;
import com.app.hotelapp.models.Producto;
import com.app.hotelapp.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductoService {

  @Autowired
  private ProductoRepository productoRepository;

  @Autowired
  private FileStorageService fileStorageService;

  public List<Producto> obtenerTodos() {
    return productoRepository.findAll();
  }

  public Producto obtenerPorId(Long id) {
    return productoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
  }

  public Producto crear(ProductoDTO productoDTO) {
    Producto producto = new Producto();
    producto.setNombre(productoDTO.getNombre());
    producto.setDescripcion(productoDTO.getDescripcion());
    producto.setPrecio(productoDTO.getPrecio());
    producto.setCategoria(productoDTO.getCategoria());

    return productoRepository.save(producto);
  }

  public Producto actualizarImagen(Long id, MultipartFile imagen) {
    Producto producto = obtenerPorId(id);
    String nombreArchivo = fileStorageService.guardarFoto(imagen);
    producto.setImagen(nombreArchivo);
    return productoRepository.save(producto);
  }

  public void eliminar(Long id) {
    Producto producto = obtenerPorId(id);
    productoRepository.delete(producto);
  }

  public Producto actualizar(Long id, ProductoDTO productoDTO) {
    Producto producto = obtenerPorId(id);

    producto.setNombre(productoDTO.getNombre());
    producto.setDescripcion(productoDTO.getDescripcion());
    producto.setPrecio(productoDTO.getPrecio());
    producto.setCategoria(productoDTO.getCategoria());

    return productoRepository.save(producto);
  }
}
