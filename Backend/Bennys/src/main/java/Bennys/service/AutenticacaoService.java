package Bennys.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRepository;

@Service
public class AutenticacaoService {

	@Autowired
    private FabricanteRepository fabricanteRepository;

	@Autowired
    private UtilizadorRepository utilizadorRepository;
	
	
	public boolean hasRole(Authentication authentication, String role) {
        if (authentication != null && authentication.isAuthenticated()) {
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            for (GrantedAuthority authority : authorities) {
                if (authority.getAuthority().equals(role)) {
                    return true;
                }
            }
        }
        return false;
    }

    public Long obterIdFabricanteAutenticado(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
            if (fabricante != null) {
                return fabricante.getId();
            }
        }
        return null;
    }
    
    public Long obterIdUtilizadorAutenticado(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Utilizador Utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
            if (Utilizador != null) {
                return Utilizador.getId();
            }
        }
        return null;
    }
}
