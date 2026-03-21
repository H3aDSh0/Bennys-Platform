package Bennys.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import Bennys.entity.detalhesVeiculos.DetalhesVeiculos;
import Bennys.entity.detalhesVeiculos.DetalhesVeiculosRepository;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteDTO;
import Bennys.entity.modeloProposta.ModeloProposta;
import Bennys.entity.modeloProposta.ModeloPropostaDTO;
import Bennys.entity.modeloProposta.ModeloPropostaRepository;
import Bennys.entity.propostaAdicao.PropostaAdicao;
import Bennys.entity.propostaAdicao.PropostaAdicaoRepository;
import Bennys.entity.propostaAdicao.PropostaDTO;
import Bennys.entity.veiculo.Veiculo;
import Bennys.entity.veiculo.VeiculoRepository;
import Bennys.util.ResultadoOperacao;

@Service
public class PropostaService {
	@Autowired
    private PropostaAdicaoRepository propostaAdicaoRepository;

    @Autowired
    private ModeloPropostaRepository modeloPropostaRepository;
    
    @Autowired
    private DetalhesVeiculosRepository detalhesVeiculosRepository;
    
    @Autowired
    private VeiculoRepository veiculoRepository;
    
	@Autowired
	private EmailService emailService;

    public List<PropostaDTO> getAllPropostasDTO() {
        List<PropostaAdicao> propostas = propostaAdicaoRepository.findAll();
        List<PropostaDTO> propostasDTO = new ArrayList<>();

        for (PropostaAdicao proposta : propostas) {
            FabricanteDTO fabricanteDTO = new FabricanteDTO(
                proposta.getFabricante().getId(),
                proposta.getFabricante().getNome(),
                proposta.getFabricante().getPais()
            );

            String dataProposta = proposta.getDataProposta().toString();

            ModeloProposta modeloProposto = modeloPropostaRepository.findById(proposta.getId()).orElse(null);
            ModeloPropostaDTO modeloPropostoDTO = null;
            if (modeloProposto != null) {
                modeloPropostoDTO = new ModeloPropostaDTO(
                    modeloProposto.getId(),
                    modeloProposto.getModelo(),
                    modeloProposto.getAno(),
                    modeloProposto.getSegmento(),
                    modeloProposto.getTipoCombustivel(),
                    modeloProposto.getPotencia(),
                    modeloProposto.getTransmissao(),
                    modeloProposto.getCaixaVelocidades(),
                    modeloProposto.getAlimentacao(),
                    modeloProposto.getTraccao(),
                    modeloProposto.getQuilometragem(),
                    modeloProposto.getNumeroPortas(),
                    modeloProposto.getCondicao(),
                    modeloProposto.getDescricao(),
                    modeloProposto.getFotos()
                );
            }

            PropostaDTO propostaDTO = new PropostaDTO(
                proposta.getId(),
                fabricanteDTO,
                dataProposta,
                proposta.getEstadoProposta(),
                modeloPropostoDTO
            );

            propostasDTO.add(propostaDTO);
        }

        return propostasDTO;
    }
    
    public List<PropostaDTO> getPropostasDoFabricanteDTO(Long idFabricante) {
        List<PropostaAdicao> propostas = propostaAdicaoRepository.findByFabricanteId(idFabricante);
        List<PropostaDTO> propostasDTO = new ArrayList<>();

        for (PropostaAdicao proposta : propostas) {
            FabricanteDTO fabricanteDTO = new FabricanteDTO(
                proposta.getFabricante().getId(),
                proposta.getFabricante().getNome(),
                proposta.getFabricante().getPais()
            );

            String dataProposta = proposta.getDataProposta().toString();

            ModeloProposta modeloProposto = modeloPropostaRepository.findById(proposta.getId()).orElse(null);
            ModeloPropostaDTO modeloPropostoDTO = null;
            if (modeloProposto != null) {
                modeloPropostoDTO = new ModeloPropostaDTO(
                    modeloProposto.getId(),
                    modeloProposto.getModelo(),
                    modeloProposto.getAno(),
                    modeloProposto.getSegmento(),
                    modeloProposto.getTipoCombustivel(),
                    modeloProposto.getPotencia(),
                    modeloProposto.getTransmissao(),
                    modeloProposto.getCaixaVelocidades(),
                    modeloProposto.getAlimentacao(),
                    modeloProposto.getTraccao(),
                    modeloProposto.getQuilometragem(),
                    modeloProposto.getNumeroPortas(),
                    modeloProposto.getCondicao(),
                    modeloProposto.getDescricao(),
                    modeloProposto.getFotos()
                );
            }

            PropostaDTO propostaDTO = new PropostaDTO(
                proposta.getId(),
                fabricanteDTO,
                dataProposta,
                proposta.getEstadoProposta(),
                modeloPropostoDTO
            );

            propostasDTO.add(propostaDTO);
        }

        return propostasDTO;
    }
	
    public List<ResultadoOperacao> aprovarProposta(List<Long> propostasIds) throws IOException {
        List<ResultadoOperacao> results = new ArrayList<>();
        for (Long propostaId : propostasIds) {
            try {
                PropostaAdicao proposta = propostaAdicaoRepository.findById(propostaId)
                    .orElseThrow(() -> new RuntimeException("Proposta não encontrada"));

                if (proposta.getEstadoProposta().equals("Aguardar Revisão")) {
                    proposta.setEstadoProposta("Aprovada");
                    propostaAdicaoRepository.save(proposta);
                    
                    DetalhesVeiculos detalhesVeiculos = detalhesVeiculosRepository.findByPropostaAdicaoId(propostaId).stream().findFirst().orElse(null);
                    if (detalhesVeiculos != null) {
                        ModeloProposta modeloProposto = detalhesVeiculos.getModeloProposta();

                        Veiculo veiculo = new Veiculo(proposta.getFabricante(),modeloProposto.getModelo(),modeloProposto.getAno(),
                        		modeloProposto.getSegmento(),modeloProposto.getTipoCombustivel(),modeloProposto.getPotencia(),
                        		modeloProposto.getTransmissao(),modeloProposto.getCaixaVelocidades(),modeloProposto.getAlimentacao(),
                        		modeloProposto.getTraccao(),modeloProposto.getQuilometragem(),modeloProposto.getNumeroPortas(),
                        		modeloProposto.getCondicao(),modeloProposto.getDescricao(),modeloProposto.getFotos()
                        		);

                        veiculoRepository.save(veiculo);
    					emailService.sendFabricantePropostaAprovadaEmail(proposta.getFabricante().getEmail(),proposta.getFabricante().getNome(),modeloProposto.getModelo());

                        results.add(new ResultadoOperacao(propostaId, "Proposta aprovada. Veículo " + modeloProposto.getModelo() +" adicionado com sucesso!", "sucesso"));
                    } else {
                    	results.add(new ResultadoOperacao(propostaId, "Detalhes do veículo não encontrados para a proposta aprovada.", "erro"));
                    }
                } else {
                    results.add(new ResultadoOperacao(propostaId, "A proposta ja foi analisada.", "erro"));
                }
            } catch (RuntimeException e) {
                results.add(new ResultadoOperacao(propostaId, "Erro ao aprovar a proposta: " + e.getMessage(), "erro"));
            }
        }
        return results;
    }

    public List<ResultadoOperacao> rejeitarProposta(List<Long> propostasIds) throws IOException {
        List<ResultadoOperacao> results = new ArrayList<>();
        for (Long propostaId : propostasIds) {
            try {
                
                PropostaAdicao proposta = propostaAdicaoRepository.findById(propostaId)
                    .orElseThrow(() -> new RuntimeException("Proposta não encontrada"));

                if (proposta.getEstadoProposta().equals("Aguardar Revisão")) {
                    DetalhesVeiculos detalhesVeiculos = detalhesVeiculosRepository.findByPropostaAdicaoId(propostaId).stream().findFirst().orElse(null);

                    proposta.setEstadoProposta("Rejeitada");
                    propostaAdicaoRepository.save(proposta);
					emailService.sendFabricantePropostaRejeitadaEmail(proposta.getFabricante().getEmail(),proposta.getFabricante().getNome(),detalhesVeiculos.getModeloProposta().getModelo());

                   
                    results.add(new ResultadoOperacao(propostaId, "Proposta rejeitada com sucesso!", "sucesso"));
                } else {
                    
                    results.add(new ResultadoOperacao(propostaId, "A proposta ja foi analisada.", "erro"));
                }
            } catch (RuntimeException e) {
                
                results.add(new ResultadoOperacao(propostaId, "Erro ao rejeitar a proposta: " + e.getMessage(), "erro"));
            }
        }
        return results;
    }

	
}
