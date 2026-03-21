package Bennys.entity.veiculo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.utilizador.Utilizador;


@Repository
public interface VeiculoRepository  extends JpaRepository<Veiculo, Long> {

    List<Veiculo> findByUtilizador(Utilizador utilizador);

	List<Veiculo> findByFabricanteAndUtilizadorIsNull(Fabricante fabricante);

}
