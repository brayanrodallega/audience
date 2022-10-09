package com.misiontic.audience.service;

import com.misiontic.audience.entities.Reservation;
import com.misiontic.audience.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation() == null){
            return reservationRepository.save(reservation);
        }else{
            Optional<Reservation> reservationAux = reservationRepository.getReservation(reservation.getIdReservation());
            if(reservationAux.isEmpty()){
                return reservationRepository.save(reservation);
            }else{
                return reservation;
            }
        }
    }

    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation() != null){
            Optional<Reservation> reservationAux = reservationRepository.getReservation(reservation.getIdReservation());
            if(!reservationAux.isEmpty()){
                if(reservation.getStartDate() != null){
                    reservationAux.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate() != null){
                    reservationAux.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus() != null){
                    reservationAux.get().setStatus(reservation.getStatus());
                }
                if(reservation.getScore() != null){
                    reservationAux.get().setScore(reservation.getScore());
                }
                reservationRepository.save(reservationAux.get());
                return reservationAux.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }

    public boolean deleteReservation(int id){
        Boolean aBoolean = getReservation(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
