package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Audience;
import com.misiontic.audience.service.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Audience")
public class AudienceController {

    @Autowired
    private AudienceService audienceService;

    @GetMapping("/all")
    public List<Audience> getAll(){
        return audienceService.getAll();
    }

    @PostMapping("/save")
    public Audience save(@RequestBody Audience audience){
        return audienceService.save(audience);
    }
}
