package com.misiontic.audience.repository.crudRepository;

import com.misiontic.audience.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryCrudRepository extends CrudRepository<Category, Integer> {
}
