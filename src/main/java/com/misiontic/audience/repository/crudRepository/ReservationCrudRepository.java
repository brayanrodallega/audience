package com.misiontic.audience.repository.crudRepository;

import com.misiontic.audience.entities.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
}
