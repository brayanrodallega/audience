package com.misiontic.audience.service;

import com.misiontic.audience.entities.Score;
import com.misiontic.audience.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score score){
        if(score.getIdScore() == null){
            return scoreRepository.save(score);
        }else{
            Optional<Score> scoreAux = scoreRepository.getScore(score.getIdScore());
            if(scoreAux.isEmpty()){
                return scoreRepository.save(score);
            }else{
                return score;
            }
        }
    }

    public Score update(Score score){
        if(score.getIdScore() != null){
            Optional<Score> scoreAux = scoreRepository.getScore(score.getIdScore());
            if(!scoreAux.isEmpty()){
                if(score.getScore() != null){
                    scoreAux.get().setScore(score.getScore());
                }
                if(score.getReservation() != null){
                    scoreAux.get().setReservation(score.getReservation());
                }
                scoreRepository.save(scoreAux.get());
                return scoreAux.get();
            }else{
                return score;
            }
        }else{
            return score;
        }
    }

    public boolean deleteScore(int id){
        Boolean aBoolean = getScore(id).map(score -> {
            scoreRepository.delete(score);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
