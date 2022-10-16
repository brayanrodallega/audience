package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Reservation;
import com.misiontic.audience.entities.dto.StatusAccount;
import com.misiontic.audience.entities.dto.TopClient;
import com.misiontic.audience.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int id){
        return reservationService.getReservation(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/update")
    public void update(@RequestBody Reservation reservation){
        reservationService.update(reservation);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        reservationService.deleteReservation(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getDatesReport(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo){
        return reservationService.getDatesReport(dateOne, dateTwo);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/report-status")
    public StatusAccount getByStatus(){
        return reservationService.getReportStatus();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/report-clients")
    public List<TopClient> getTopClients(){
        return reservationService.getTopClients();
    }
}
