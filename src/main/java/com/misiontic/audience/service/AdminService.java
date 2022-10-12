package com.misiontic.audience.service;

import com.misiontic.audience.entities.Admin;
import com.misiontic.audience.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id){
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin admin){
        if(admin.getIdAdmin() == null){
            return adminRepository.save(admin);
        }else{
            Optional<Admin> adminAux = adminRepository.getAdmin(admin.getIdAdmin());
            if(adminAux.isEmpty()){
                return adminRepository.save(admin);
            }else{
                return admin;
            }
        }
    }

    public Admin update(Admin admin){
        if(admin.getIdAdmin() != null){
            Optional<Admin> adminAux = adminRepository.getAdmin(admin.getIdAdmin());
            if(!adminAux.isEmpty()){
                if(admin.getName() != null){
                    adminAux.get().setName(admin.getName());
                }
                if(admin.getEmail() != null){
                    adminAux.get().setEmail(admin.getEmail());
                }
                if(admin.getPassword() != null){
                    adminAux.get().setPassword(admin.getPassword());
                }
                if(admin.getAge() != null){
                    adminAux.get().setAge(admin.getAge());
                }
                adminRepository.save(adminAux.get());
                return adminAux.get();
            }else{
                return admin;
            }
        }else{
            return admin;
        }
    }

    public boolean deleteAdmin(int id){
        Boolean aBoolean = getAdmin(id).map(admin -> {
            adminRepository.delete(admin);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
