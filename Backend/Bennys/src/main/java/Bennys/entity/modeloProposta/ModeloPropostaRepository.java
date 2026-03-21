package Bennys.entity.modeloProposta;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeloPropostaRepository extends JpaRepository<ModeloProposta, Long> {
    Optional<ModeloProposta> findById(Long id);

}
