package Bennys.entity.disponibilidadeVeiculo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Bennys.entity.veiculo.Veiculo;


public interface DisponibilidadeVeiculoRepository extends JpaRepository <DisponibilidadeVeiculo, Long> {
    Optional<DisponibilidadeVeiculo> findByVeiculo(Veiculo veiculo);

	List<DisponibilidadeVeiculo> findByTipoOperacaoAndDisponibilidade(String Operacao, String Disponibilidade);
	
	List<DisponibilidadeVeiculo> findByDisponibilidade(String Disponibilidade);

	List<DisponibilidadeVeiculo> findByDisponibilidadeAndPrecoVendaLessThanEqual(String string, BigDecimal precoMaximo);

}
