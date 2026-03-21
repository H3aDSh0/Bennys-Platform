package Bennys.entity.propostaAdicao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PropostaAdicaoRepository extends JpaRepository<PropostaAdicao, Long>{
    List<PropostaAdicao> findByFabricanteId(Long fabricanteId);
}
