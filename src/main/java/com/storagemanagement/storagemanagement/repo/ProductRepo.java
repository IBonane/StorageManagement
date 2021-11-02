package com.storagemanagement.storagemanagement.repo;

import com.storagemanagement.storagemanagement.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository <Product,Long> {
}
