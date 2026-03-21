package Bennys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRepository;

@Service
public class UtilizadorService implements UserDetailsService {
	
	@Autowired
    private  UtilizadorRepository utilizadorRepository;
    
    @Autowired
    public UtilizadorService(UtilizadorRepository utilizadorRepository) {
        this.utilizadorRepository = utilizadorRepository;
    }
    
    // Método para obter todos os utilizadores
    public List<Utilizador> getAllUtilizadores() {
        return utilizadorRepository.findAll();
    }
    
    
    // Método para verificar se um usuário existe pelo email
    public boolean existsByEmail(String email) {
        return utilizadorRepository.existsByEmail(email);
    }
    
    // Método para registrar um novo utilizador
    public Utilizador registerNewUtilizador(Utilizador newUtilizador) {
        return utilizadorRepository.save(newUtilizador);
    }
    	

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		//return utilizadorRepository.findByEmail(login);
        if (login.contains("@")) {
        	return utilizadorRepository.findByEmail(login);
        } else {
        	return utilizadorRepository.findByNumeroTelemovel(login);
        }
	}
	
	

    
}
