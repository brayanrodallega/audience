package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Category;
import com.misiontic.audience.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryService.getAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void save(@RequestBody Category category){
        categoryService.save(category);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Optional<Category> getCategory(@PathVariable("id") int id){
        return categoryService.getCategory(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/update")
    public void update(@RequestBody Category category){
        categoryService.update(category);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        categoryService.delete(id);
    }
}
