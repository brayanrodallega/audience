package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Score;
import com.misiontic.audience.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/all")
    public List<Score> getAll(){
        return scoreService.getAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void save(@RequestBody Score score){
        scoreService.save(score);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Optional<Score> getScore(@PathVariable("id") int id){
        return scoreService.getScore(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/update")
    public void update(@RequestBody Score score){
        scoreService.update(score);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        scoreService.deleteScore(id);
    }
}
