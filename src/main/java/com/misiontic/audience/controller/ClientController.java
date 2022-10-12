package com.misiontic.audience.controller;

import com.misiontic.audience.entities.Client;
import com.misiontic.audience.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/all")
    public List<Client> getAll(){
        return clientService.getAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public void save(@RequestBody Client client){
        clientService.save(client);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Optional<Client> getClient(@PathVariable("id") int id){
        return clientService.getClient(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/update")
    public void update(@RequestBody Client client){
        clientService.save(client);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id){
        clientService.deleteClient(id);
    }
}
