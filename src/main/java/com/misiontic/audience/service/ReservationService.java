package com.misiontic.audience.service;

import com.misiontic.audience.entities.Client;
import com.misiontic.audience.entities.Reservation;
import com.misiontic.audience.entities.dto.StatusAccount;
import com.misiontic.audience.entities.dto.TopClient;
import com.misiontic.audience.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    public List<Reservation> getDatesReport(String dateOne, String dateTwo){

        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date a = new Date();
        Date b = new Date();

        try {
            a = parser.parse(dateOne);
            b = parser.parse(dateTwo);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (a.before(b)){
            return reservationRepository.getDatesReport(a, b);
        }else{
            return new ArrayList<Reservation>();
        }
    }

    public StatusAccount getReportStatus(){
        List<Reservation> completed = reservationRepository.getReservationStatusReport("completed");
        List<Reservation> cancelled = reservationRepository.getReservationStatusReport("cancelled");
        return new StatusAccount(completed.size(), cancelled.size());
    }

    public List<TopClient> getTopClients(){
        List<TopClient> tc=new ArrayList<>();
        List<Object[]> result= reservationRepository.getTopClients();

        for(int i=0;i<result.size();i++){
            int total=Integer.parseInt(result.get(i)[1].toString());
            Client client= (Client) result.get(i)[0];
            TopClient topClient=new TopClient(total,client);
            tc.add(topClient);
        }
        return tc;
    }
}
