package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Reservation;
import com.misiontic.audience.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/all")
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void save(@RequestBody Reservation reservation){
        reservationService.save(reservation);
    }
}
