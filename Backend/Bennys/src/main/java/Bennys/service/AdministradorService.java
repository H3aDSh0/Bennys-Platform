package Bennys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Bennys.entity.administrador.AdministradorRepository;

@Service
public class AdministradorService implements UserDetailsService {

	@Autowired
    private AdministradorRepository administradorRepository;
	
	public AdministradorService(AdministradorRepository administradorRepository) {
		this.administradorRepository = administradorRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		if (login.contains("@")) {
        	return administradorRepository.findByEmail(login);
        } else {
        	return administradorRepository.findByNumeroTelemovel(login);
        }
	}

}
