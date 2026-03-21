package Bennys.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import Bennys.entity.administrador.Administrador;
import Bennys.entity.administrador.AdministradorRepository;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter{

	 @Autowired
	 TokenService tokenService;
	 
	 @Autowired
	 UtilizadorRepository utilizadorRepository;
	 
	 @Autowired
	 FabricanteRepository fabricanteRepository;
	 
	 @Autowired
	 AdministradorRepository administradorRepository;


	    //tenho de fazer para o fabricante e administrador
	/*@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if(token != null){
            var Email = tokenService.validateToken(token);
            UserDetails utilizador = utilizadorRepository.findByEmail(Email);

            var authentication = new UsernamePasswordAuthenticationToken(utilizador, null, utilizador.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
	 */

	@Override
	    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
	        var token = this.recoverToken(request);
	        if (token != null) {
	            var email = tokenService.validateToken(token);
	            UserDetails userDetails = null;

	            // Verifica se o token pertence a um Utilizador
	            Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
	            if (utilizador != null) {
	                userDetails = utilizador;
	            } else {
	                // Se não for um Utilizador, verifica se é um Fabricante
	                Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
	                if (fabricante != null) {
	                    userDetails = fabricante;
	                } else {
	                	Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
		                if (administrador != null) {
		                    userDetails = administrador;
		                }
	                }
	                
	            }

	            if (userDetails != null) {
	                var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                SecurityContextHolder.getContext().setAuthentication(authentication);
	            }
	        }
	        filterChain.doFilter(request, response);
	    }





	
	private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
