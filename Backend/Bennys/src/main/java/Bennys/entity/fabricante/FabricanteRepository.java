package Bennys.entity.fabricante;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface FabricanteRepository extends JpaRepository<Fabricante, Long> {

	Boolean existsByEmail(String email);

	UserDetails findByEmail(String login);

	UserDetails findByNumeroTelemovel(String login);
	
	List<Fabricante> findByStatus(String status);
}
