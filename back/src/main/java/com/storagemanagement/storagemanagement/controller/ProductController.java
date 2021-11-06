package com.storagemanagement.storagemanagement.controller;

import com.storagemanagement.storagemanagement.model.Product;
import com.storagemanagement.storagemanagement.model.Transaction;
import com.storagemanagement.storagemanagement.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class ProductController {

    @Autowired
    ProductRepo productRepo;

    @GetMapping("/productList")
    public List<Product> getProductList(){
        return productRepo.findAll();
    }

    @GetMapping("/product")
    public Optional<Product> getProductById(@RequestParam Long id){
        return productRepo.findById(id);
    }

    @PostMapping("/product")
    public Product saveProduct(@RequestBody Product product){

        if(product.getId()!=null) {
            Optional<Product> prod = productRepo.findById(product.getId());
            List<Transaction> transactionList = prod.get().getTransactionList();
            for (Transaction trans : product.getTransactionList()) {
                if (trans.getId() == null) {
                    transactionList.add(trans);
                }
            }
            product.setTransactionList(transactionList);
        }
        return productRepo.save(product);
    }

    @DeleteMapping("/product")
    public void deleteProduct(@RequestParam Long id){
        productRepo.deleteById(id);
    }
}
