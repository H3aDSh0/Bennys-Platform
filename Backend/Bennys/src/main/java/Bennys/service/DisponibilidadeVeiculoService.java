package Bennys.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeDTO;
import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeVeiculo;
import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeVeiculoRepository;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRepository;
import Bennys.entity.veiculo.Veiculo;
import Bennys.entity.veiculo.VeiculoRepository;
import Bennys.util.ResultadoOperacao;

@Service
public class DisponibilidadeVeiculoService {

	@Autowired
	private VeiculoRepository veiculoRepository;
	
	@Autowired
	private UtilizadorRepository utilizadorRepository;

	@Autowired
	private AutenticacaoService autenticacaoService;

	@Autowired
    private DisponibilidadeVeiculoRepository disponibilidadeVeiculoRepository;
	
	public ResultadoOperacao atualizarDisponibilidadeVeiculo(DisponibilidadeDTO disponibilidadeDTO, String email) {
		Optional<Veiculo> optionalVeiculo = veiculoRepository.findById(disponibilidadeDTO.idVeiculo());

		if (optionalVeiculo.isEmpty()) {
			return new ResultadoOperacao(disponibilidadeDTO.idVeiculo(), "Veículo não encontrado", "erro");
		}

		Veiculo veiculo = optionalVeiculo.get();
		String emailProprietarioVeiculo = (veiculo.getUtilizador() != null) ? veiculo.getUtilizador().getEmail() : veiculo.getFabricante().getEmail();

		if (!email.equals(emailProprietarioVeiculo)) {
			return new ResultadoOperacao(veiculo.getId(), "Não tens permissão para atualizar a disponibilidade deste veículo",
					"erro");
		}
		
		 // Verificar se o veículo já está disponível para venda ou aluguel
	    Optional<DisponibilidadeVeiculo> disponibilidadeExistente = disponibilidadeVeiculoRepository.findByVeiculo(veiculo);
	    if (disponibilidadeExistente.isPresent()) {
	        if ("Disponível".equals(disponibilidadeExistente.get().getDisponibilidade())) {
	            return new ResultadoOperacao(veiculo.getId(), "O veículo já está disponível para venda ou aluguel", "erro");
	        }
	    }

		try {
			DisponibilidadeVeiculo disponibilidadeVeiculo = new DisponibilidadeVeiculo(veiculo,
					disponibilidadeDTO.tipoOperacao(), disponibilidadeDTO.precoVenda(),
					disponibilidadeDTO.precoAluguelDia(), disponibilidadeDTO.disponibilidade());

			disponibilidadeVeiculoRepository.save(disponibilidadeVeiculo);
			return new ResultadoOperacao(veiculo.getId(), "Disponibilidade do veículo atualizada com sucesso", "sucesso");
		} catch (Exception e) {
			return new ResultadoOperacao(veiculo.getId(), "Erro ao atualizar a disponibilidade do veículo: " + e.getMessage(),"erro");
		}

	}
	
	public ResultadoOperacao editarDisponibilidadeVeiculo(DisponibilidadeDTO disponibilidadeDTO, String email) {
		Optional<Veiculo> optionalVeiculo = veiculoRepository.findById(disponibilidadeDTO.idVeiculo());

		if (optionalVeiculo.isEmpty()) {
			return new ResultadoOperacao(disponibilidadeDTO.idVeiculo(), "Veículo não encontrado", "erro");
		}

		Veiculo veiculo = optionalVeiculo.get();
		String emailProprietarioVeiculo = (veiculo.getUtilizador() != null) ? veiculo.getUtilizador().getEmail() : veiculo.getFabricante().getEmail();

		if (!email.equals(emailProprietarioVeiculo)) {
			return new ResultadoOperacao(veiculo.getId(),"Não tens permissão para editar a disponibilidade deste veículo", "erro");
		}

		// Verificar se o veículo já está disponível para venda ou aluguel
		Optional<DisponibilidadeVeiculo> disponibilidadeExistente = disponibilidadeVeiculoRepository.findByVeiculo(veiculo);
		if (disponibilidadeExistente.isPresent()) {
			DisponibilidadeVeiculo disponibilidadeVeiculo = disponibilidadeExistente.get();
			disponibilidadeVeiculo.setTipoOperacao(disponibilidadeDTO.tipoOperacao());
			disponibilidadeVeiculo.setPrecoVenda(disponibilidadeDTO.precoVenda());
			disponibilidadeVeiculo.setPrecoAluguelDia(disponibilidadeDTO.precoAluguelDia());
			disponibilidadeVeiculo.setDisponibilidade(disponibilidadeDTO.disponibilidade());

			try {
				disponibilidadeVeiculoRepository.save(disponibilidadeVeiculo);
				return new ResultadoOperacao(veiculo.getId(), "Disponibilidade do veículo editada com sucesso","sucesso");
			} catch (Exception e) {
				return new ResultadoOperacao(veiculo.getId(),"Erro ao editar a disponibilidade do veículo: " + e.getMessage(), "erro");
			}
		} else {
			return new ResultadoOperacao(veiculo.getId(), "Disponibilidade do veículo não encontrada", "erro");
		}

	}
	
	public ResultadoOperacao removerDisponibilidadeVeiculo(Long idVeiculo, String email) {
	    Optional<Veiculo> optionalVeiculo = veiculoRepository.findById(idVeiculo);

	    if (optionalVeiculo.isEmpty()) {
	        return new ResultadoOperacao(idVeiculo, "Veículo não encontrado", "erro");
	    }

	    Veiculo veiculo = optionalVeiculo.get();
	    String emailProprietarioVeiculo = (veiculo.getUtilizador() != null) ? veiculo.getUtilizador().getEmail() : veiculo.getFabricante().getEmail();

	    if (!email.equals(emailProprietarioVeiculo)) {
	        return new ResultadoOperacao(veiculo.getId(), "Não tens permissão para remover a disponibilidade deste veículo", "erro");
	    }

	    // Verificar se o veículo tem uma disponibilidade associada
	    Optional<DisponibilidadeVeiculo> disponibilidadeVeiculoOptional = disponibilidadeVeiculoRepository.findByVeiculo(veiculo);

	    if (disponibilidadeVeiculoOptional.isEmpty()) {
	        return new ResultadoOperacao(idVeiculo, "O veículo não tem disponibilidade registada", "erro");
	    }

	    try {
	        // Remover a disponibilidade do veículo
	        disponibilidadeVeiculoRepository.delete(disponibilidadeVeiculoOptional.get());
	        return new ResultadoOperacao(idVeiculo, "Disponibilidade do veículo removida com sucesso", "sucesso");
	    } catch (Exception e) {
	        return new ResultadoOperacao(idVeiculo, "Erro ao remover a disponibilidade do veículo: " + e.getMessage(), "erro");
	    }
	}

	public ResultadoOperacao comprarVeiculo(Long idVeiculo, String email) {
		Optional<Veiculo> optionalVeiculo = veiculoRepository.findById(idVeiculo);

		if (optionalVeiculo.isEmpty()) {
			return new ResultadoOperacao(idVeiculo, "Veículo não encontrado", "erro");
		}

		Veiculo veiculo = optionalVeiculo.get();
		String emailProprietarioVeiculo = (veiculo.getUtilizador() != null) ? veiculo.getUtilizador().getEmail() : veiculo.getFabricante().getEmail();

		if (email.equals(emailProprietarioVeiculo)) {
			return new ResultadoOperacao(veiculo.getId(), "Não podes comprar o teu próprio veículo",
					"erro");
		}
		
	    Optional<DisponibilidadeVeiculo> disponibilidadeExistente = disponibilidadeVeiculoRepository.findByVeiculo(veiculo);
	    if (disponibilidadeExistente.isPresent()) {
	        if ("Disponível".equals(disponibilidadeExistente.get().getDisponibilidade())) {
	        	
	        	 Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
	                if (utilizador == null) {
	                    return new ResultadoOperacao(veiculo.getId(), "Utilizador não encontrado", "erro");
	                }

		        	 veiculo.setUtilizador(utilizador);
		             veiculoRepository.save(veiculo);
			        	disponibilidadeVeiculoRepository.delete(disponibilidadeExistente.get());

	        	
			            return new ResultadoOperacao(idVeiculo, "Veículo comprado com sucesso", "sucesso");
            } else {
                return new ResultadoOperacao(idVeiculo, "Veículo não está disponível para compra", "erro");
            }
	    }
        return new ResultadoOperacao(idVeiculo, "Disponibilidade do veículo não encontrada", "erro");

		
	}


	
	
}
