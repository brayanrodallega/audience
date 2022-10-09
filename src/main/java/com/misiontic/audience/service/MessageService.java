package com.misiontic.audience.service;

import com.misiontic.audience.entities.Message;
import com.misiontic.audience.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message message){
        if(message.getIdMessage() == null){
            return messageRepository.save(message);
        }else{
            Optional<Message> messageAux = messageRepository.getMessage(message.getIdMessage());
            if(messageAux.isEmpty()){
                return messageRepository.save(message);
            }else{
                return message;
            }
        }
    }

    public Message update(Message message){
        if(message.getIdMessage() != null){
            Optional<Message> messageAux = messageRepository.getMessage(message.getIdMessage());
            if(!messageAux.isEmpty()){
                if(message.getMessageText() != null){
                    messageAux.get().setMessageText(message.getMessageText());
                }
                messageRepository.save(messageAux.get());
                return messageAux.get();
            }else{
                return message;
            }
        }else{
            return message;
        }
    }

    public boolean deleteMessage(int id){
        Boolean aBoolean = getMessage(id).map(message -> {
            messageRepository.delete(message);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
