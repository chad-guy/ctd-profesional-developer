package com.app.hotelapp.repositories;

import com.app.hotelapp.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
