package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Audience;
import com.misiontic.audience.service.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Audience")
public class AudienceController {

    @Autowired
    private AudienceService audienceService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/all")
    public List<Audience> getAll(){
        return audienceService.getAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void save(@RequestBody Audience audience){
        audienceService.save(audience);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Optional<Audience> getAudience(@PathVariable("id") int id){
        return audienceService.getAudience(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/update")
    public void update(@RequestBody Audience audience){
        audienceService.update(audience);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        audienceService.deleteAudience(id);
    }
}
