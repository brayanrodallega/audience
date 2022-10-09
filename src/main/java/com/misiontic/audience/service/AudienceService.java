package com.misiontic.audience.service;

import com.misiontic.audience.entities.Audience;
import com.misiontic.audience.repository.AudienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class AudienceService {

    @Autowired
    private AudienceRepository audienceRepository;

    public List<Audience> getAll(){
        return audienceRepository.getAll();
    }

    public Optional<Audience> getAudience(int id){
        return audienceRepository.getAudience(id);
    }

    public Audience save(Audience audience){
        if(audience.getId() == null){
            return audienceRepository.save(audience);
        }else{
            Optional<Audience> audienceAux = audienceRepository.getAudience(audience.getId());
            if(audienceAux.isEmpty()){
                return audienceRepository.save(audience);
            }else{
                return audience;
            }
        }
    }

    public Audience update(Audience audience){
        if(audience.getId() != null){
            Optional<Audience> audienceAux = audienceRepository.getAudience(audience.getId());
            if(!audienceAux.isEmpty()){
                if(audience.getName() != null){
                    audienceAux.get().setName(audience.getName());
                }
                if(audience.getOwner() != null){
                    audienceAux.get().setOwner(audience.getOwner());
                }
                if(audience.getCapacity() != null){
                    audienceAux.get().setCapacity(audience.getCapacity());
                }
                if(audience.getDescription() != null){
                    audienceAux.get().setDescription(audience.getDescription());
                }
                if(audience.getCategory() != null){
                    audienceAux.get().setCategory(audience.getCategory());
                }
                if(audience.getMessages() != null){
                    audienceAux.get().setMessages(audience.getMessages());
                }

                audienceRepository.save(audienceAux.get());
                return audienceAux.get();
            }else{
                return audience;
            }
        }else{
            return audience;
        }
    }

    public boolean deleteAudience(int id){
        Boolean aBoolean = getAudience(id).map(audience -> {
            audienceRepository.delete(audience);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
