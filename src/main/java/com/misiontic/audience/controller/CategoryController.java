package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Category;
import com.misiontic.audience.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryService.getAll();
    }

    @PostMapping("/save")
    public Category save(@RequestBody Category category){
        return categoryService.save(category);
    }
}
