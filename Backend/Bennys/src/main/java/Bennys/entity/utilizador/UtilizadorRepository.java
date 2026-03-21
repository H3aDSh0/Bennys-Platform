package Bennys.entity.utilizador;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilizadorRepository extends JpaRepository<Utilizador, Long> {
	
	List<Utilizador> findAll();
	
	UserDetails findByEmail(String login);
	
	Boolean existsByEmail(String email);

	UserDetails findByNumeroTelemovel(String login);
	

}
