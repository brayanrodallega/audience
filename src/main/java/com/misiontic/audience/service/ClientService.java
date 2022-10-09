package com.misiontic.audience.service;

import com.misiontic.audience.entities.Client;
import com.misiontic.audience.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    public Client save(Client client){
        if(client.getIdClient() == null){
            return clientRepository.save(client);
        }else{
            Optional<Client> clientAux = clientRepository.getClient(client.getIdClient());
            if(clientAux.isEmpty()){
                return clientRepository.save(client);
            }else{
                return client;
            }
        }
    }

    public Client update(Client client){
        if(client.getIdClient() != null){
            Optional<Client> clientAux = clientRepository.getClient(client.getIdClient());
            if(!clientAux.isEmpty()){
                if(client.getName() != null){
                    clientAux.get().setName(client.getName());
                }
                if(client.getEmail() != null){
                    clientAux.get().setEmail(client.getEmail());
                }
                if(client.getPassword() != null){
                    clientAux.get().setPassword(client.getPassword());
                }
                if(client.getAge() != null){
                    clientAux.get().setAge(client.getAge());
                }
                if(client.getMessages() != null){
                    clientAux.get().setMessages(client.getMessages());
                }

                clientRepository.save(clientAux.get());
                return clientAux.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }

    public boolean deleteClient(int id){
        Boolean aBoolean = getClient(id).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
