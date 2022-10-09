package com.misiontic.audience.repository.crudRepository;

import com.misiontic.audience.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
