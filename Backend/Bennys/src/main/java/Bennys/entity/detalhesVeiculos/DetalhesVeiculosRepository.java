package Bennys.entity.detalhesVeiculos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalhesVeiculosRepository extends JpaRepository <DetalhesVeiculos, Long> {

    List<DetalhesVeiculos> findByPropostaAdicaoId(Long propostaId);
    

}
