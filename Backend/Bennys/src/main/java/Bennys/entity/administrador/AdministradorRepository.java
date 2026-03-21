package Bennys.entity.administrador;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

	Boolean existsByEmail(String email);

	UserDetails findByEmail(String login);

	UserDetails findByNumeroTelemovel(String login);
}
