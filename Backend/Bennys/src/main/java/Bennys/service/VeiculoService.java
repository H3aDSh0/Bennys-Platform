package Bennys.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeDTO;
import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeVeiculo;
import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeVeiculoRepository;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRepository;
import Bennys.entity.veiculo.Veiculo;
import Bennys.entity.veiculo.VeiculoDisponivelDTO;
import Bennys.entity.veiculo.VeiculoFiltroDTO;
import Bennys.entity.veiculo.VeiculoRepository;

@CrossOrigin("*")
@Service
public class VeiculoService {

	@Autowired
    private DisponibilidadeVeiculoRepository disponibilidadeVeiculoRepository;
	
	@Autowired
    private VeiculoRepository veiculoRepository;
	
    @Autowired
    private AutenticacaoService autenticacaoService;
    
	@Autowired
    private FabricanteRepository fabricanteRepository;
	
	@Autowired
    private UtilizadorRepository utilizadorRepository;
    

	
	private List<VeiculoDisponivelDTO> buscarTodosVeiculosDisponiveis() {
		List<DisponibilidadeVeiculo> disponibilidades = disponibilidadeVeiculoRepository
				.findByDisponibilidade("Disponível");
		List<VeiculoDisponivelDTO> veiculosDisponiveisDTO = new ArrayList<>();

		for (DisponibilidadeVeiculo disponibilidade : disponibilidades) {
			Optional<Veiculo> optionalVeiculo = veiculoRepository.findById(disponibilidade.getVeiculo().getId());
			if (optionalVeiculo.isPresent()) {
				Veiculo veiculo = optionalVeiculo.get();
				String emailProprietarioVeiculo = (veiculo.getUtilizador() != null) ? veiculo.getUtilizador().getEmail()
						: veiculo.getFabricante().getEmail();

				VeiculoDisponivelDTO veiculoDTO = new VeiculoDisponivelDTO(veiculo.getId(),
						veiculo.getFabricante().getNome(),veiculo.getFabricante().getFotoPerfil(), emailProprietarioVeiculo, veiculo.getModelo(),
						veiculo.getAno(), veiculo.getSegmento(), veiculo.getTipoCombustivel(), veiculo.getPotencia(),
						veiculo.getTransmissao(), veiculo.getCaixaVelocidades(), veiculo.getAlimentacao(),
						veiculo.getTraccao(), veiculo.getQuilometragem(), veiculo.getNumeroPortas(),
						veiculo.getCondicao(), veiculo.getDescricao(), veiculo.getFotos(),
						disponibilidade.getTipoOperacao(), disponibilidade.getPrecoVenda(),
						disponibilidade.getPrecoAluguelDia(), disponibilidade.getDisponibilidade());
				veiculosDisponiveisDTO.add(veiculoDTO);
			}
		}
		return veiculosDisponiveisDTO;
	}
	

	public List<VeiculoDisponivelDTO> visualizarVeiculosDisponiveis(VeiculoFiltroDTO filtro) {
	    if (filtro == null || filtro.isVazio()) {
	        return buscarTodosVeiculosDisponiveis();
	    } else {
	        return aplicarFiltros(filtro);
	    }
	}


	private List<VeiculoDisponivelDTO> aplicarFiltros(VeiculoFiltroDTO filtro) {
	    List<VeiculoDisponivelDTO> veiculosFiltrados = new ArrayList<>();

	    List<DisponibilidadeVeiculo> disponibilidades = disponibilidadeVeiculoRepository.findByDisponibilidade("Disponível");

	    for (DisponibilidadeVeiculo disponibilidade : disponibilidades) {
	        Veiculo veiculo = disponibilidade.getVeiculo();

	        if (verificarFiltro(veiculo, disponibilidade, filtro)) {
	            String emailProprietarioVeiculo = (veiculo.getUtilizador() != null) ? veiculo.getUtilizador().getEmail()
	                    : veiculo.getFabricante().getEmail();

	            VeiculoDisponivelDTO veiculoDTO = new VeiculoDisponivelDTO(veiculo.getId(),
	                    veiculo.getFabricante().getNome(),veiculo.getFabricante().getFotoPerfil(), emailProprietarioVeiculo, veiculo.getModelo(),
	                    veiculo.getAno(), veiculo.getSegmento(), veiculo.getTipoCombustivel(), veiculo.getPotencia(),
	                    veiculo.getTransmissao(), veiculo.getCaixaVelocidades(), veiculo.getAlimentacao(),
	                    veiculo.getTraccao(), veiculo.getQuilometragem(), veiculo.getNumeroPortas(),
	                    veiculo.getCondicao(), veiculo.getDescricao(), veiculo.getFotos(),
	                    disponibilidade.getTipoOperacao(), disponibilidade.getPrecoVenda(),
	                    disponibilidade.getPrecoAluguelDia(), disponibilidade.getDisponibilidade());
	            
	            veiculosFiltrados.add(veiculoDTO);
	        }
	    }

	    return veiculosFiltrados;
	}
	
	private boolean verificarFiltro(Veiculo veiculo, DisponibilidadeVeiculo disponibilidade, VeiculoFiltroDTO filtro) {
	    return (filtro.getFabricante() == null || veiculo.getFabricante().getNome().equalsIgnoreCase(filtro.getFabricante())) &&
	           (filtro.getModelo() == null || veiculo.getModelo().equalsIgnoreCase(filtro.getModelo())) &&
	           (filtro.getAnoMinimo() == null || veiculo.getAno() >= filtro.getAnoMinimo()) &&
	           (filtro.getAnoMaximo() == null || veiculo.getAno() <= filtro.getAnoMaximo()) &&
	           (filtro.getPrecoMinimo() == null || disponibilidade.getPrecoVenda().compareTo(filtro.getPrecoMinimo()) >= 0) &&
	           (filtro.getPrecoMaximo() == null || disponibilidade.getPrecoVenda().compareTo(filtro.getPrecoMaximo()) <= 0) &&
	           (filtro.getTipoCombustivel() == null || veiculo.getTipoCombustivel().equalsIgnoreCase(filtro.getTipoCombustivel())) &&
	           (filtro.getPotenciaMinima() == null || veiculo.getPotencia() >= filtro.getPotenciaMinima()) &&
	           (filtro.getPotenciaMaxima() == null || veiculo.getPotencia() <= filtro.getPotenciaMaxima());
	}
	
	public List<VeiculoDisponivelDTO> visualizarGaragem(Authentication authentication) {
	    if (authentication != null && authentication.isAuthenticated()) {
	        String emailProprietarioVeiculo = authentication.getName();
	        List<Veiculo> carrosNaGaragem = null;

	        if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
	            Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(emailProprietarioVeiculo);
	            if (utilizador != null) {
	                carrosNaGaragem = veiculoRepository.findByUtilizador(utilizador);
	            }
	        } else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
	            Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(emailProprietarioVeiculo);
	            if (fabricante != null) {
	                carrosNaGaragem = veiculoRepository.findByFabricanteAndUtilizadorIsNull(fabricante);
	            }
	        }

	        if (carrosNaGaragem != null && !carrosNaGaragem.isEmpty()) {
	            List<VeiculoDisponivelDTO> veiculosDTO = new ArrayList<>();
	            for (Veiculo veiculo : carrosNaGaragem) {
	                VeiculoDisponivelDTO veiculoDTO = new VeiculoDisponivelDTO(
	                        veiculo.getId(),veiculo.getFabricante().getNome(),veiculo.getFabricante().getFotoPerfil(),
	                        emailProprietarioVeiculo,veiculo.getModelo(),veiculo.getAno(),veiculo.getSegmento(),
	                        veiculo.getTipoCombustivel(),veiculo.getPotencia(),veiculo.getTransmissao(),veiculo.getCaixaVelocidades(),
	                        veiculo.getAlimentacao(),veiculo.getTraccao(),veiculo.getQuilometragem(),veiculo.getNumeroPortas(),
	                        veiculo.getCondicao(),veiculo.getDescricao(),veiculo.getFotos(),null,null,null,null
	                );

	                Optional<DisponibilidadeVeiculo> disponibilidade = disponibilidadeVeiculoRepository.findByVeiculo(veiculo);
	                if (disponibilidade.isPresent()) {
	                    DisponibilidadeVeiculo disponibilidadeVeiculo = disponibilidade.get();
	                    veiculoDTO.setTipoOperacao(disponibilidadeVeiculo.getTipoOperacao());
	                    veiculoDTO.setPrecoVenda(disponibilidadeVeiculo.getPrecoVenda());
	                    veiculoDTO.setPrecoAluguelDia(disponibilidadeVeiculo.getPrecoAluguelDia());
	                    veiculoDTO.setDisponibilidade(disponibilidadeVeiculo.getDisponibilidade());
	                }

	                veiculosDTO.add(veiculoDTO);
	            }
	            return veiculosDTO;
	        }
	    }
	    return Collections.emptyList();
	}


	



}
