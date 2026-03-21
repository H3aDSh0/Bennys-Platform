package Bennys.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import Bennys.entity.detalhesVeiculos.DetalhesVeiculos;
import Bennys.entity.detalhesVeiculos.DetalhesVeiculosRepository;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.modeloProposta.ModeloProposta;
import Bennys.entity.modeloProposta.ModeloPropostaRepository;
import Bennys.entity.propostaAdicao.PropostaAdicao;
import Bennys.entity.propostaAdicao.PropostaAdicaoRepository;
import Bennys.util.ResultadoOperacao;

@Service
public class FabricanteService implements UserDetailsService {

	@Autowired
	private FabricanteRepository fabricanteRepository;
	
	@Autowired
	private PropostaAdicaoRepository propostaAdicaoRepository;
	
	@Autowired
	private DetalhesVeiculosRepository detalhesVeiculosRepository;

	
	@Autowired
	private ModeloPropostaRepository modeloPropostaRepository;
	
	@Autowired
	private EmailService emailService;
    
	@Autowired
	private Gson gson;

	@Autowired
	public FabricanteService(FabricanteRepository fabricanteRepository) {
		this.fabricanteRepository = fabricanteRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
		if (login.contains("@")) {
			return fabricanteRepository.findByEmail(login);
		} else {
			return fabricanteRepository.findByNumeroTelemovel(login);
		}
	}

	public String getFabricantesPendentes() {
		List<Fabricante> fabricantesPendentes = fabricanteRepository.findAll();
		if (fabricantesPendentes.isEmpty()) {
			return "Não há fabricantes pendentes no momento.";
		} else {
			JsonArray fabricantesJson = new JsonArray();
			for (Fabricante fabricante : fabricantesPendentes) {
				JsonObject fabricanteJson = new JsonObject();
				fabricanteJson.addProperty("id", fabricante.getId());
				fabricanteJson.addProperty("nome", fabricante.getNome());
				fabricanteJson.addProperty("email", fabricante.getEmail());
				fabricanteJson.addProperty("numeroTelemovel", fabricante.getNumeroTelemovel());
				fabricanteJson.addProperty("sede", fabricante.getSede());
				fabricanteJson.addProperty("pais", fabricante.getPais());
				fabricanteJson.addProperty("portfolioVeiculos", fabricante.getPortfolioVeiculos());
				fabricanteJson.addProperty("documentacaoCertificacao", fabricante.getDocumentacaoCertificacao());
				fabricanteJson.addProperty("fotoPerfil", fabricante.getFotoPerfil());
				fabricanteJson.addProperty("role", fabricante.getRole());
				fabricanteJson.addProperty("descricao", fabricante.getDescricao());
				fabricanteJson.addProperty("status", fabricante.getStatus());
				fabricanteJson.addProperty("dataRegisto", fabricante.getDataRegisto().toString());
				fabricantesJson.add(fabricanteJson);
			}
			return fabricantesJson.toString();
		}

	}
	

	public List<ResultadoOperacao> aprovarRegistoFabricante(List<Long> fabricanteIds) throws IOException {
		List<ResultadoOperacao> results = new ArrayList<>();
		for (Long fabricanteId : fabricanteIds) {
			try {
				Fabricante fabricante = fabricanteRepository.findById(fabricanteId)
						.orElseThrow(() -> new RuntimeException("Fabricante não encontrado"));
				if (fabricante.getStatus().equals("PENDENTE")) {
					fabricante.setStatus("APROVADO");
					fabricanteRepository.save(fabricante);
					emailService.sendFabricanteEmailAprovado(fabricante.getEmail(), fabricante.getNome());
					results.add(new ResultadoOperacao(fabricanteId,
							"Registo do fabricante com ID " + fabricanteId + " aprovado com sucesso!", "sucesso"));
				} else {
					results.add(new ResultadoOperacao(fabricanteId,
							"Registo do fabricante com ID " + fabricanteId + " não está pendente.", "erro"));
				}

			} catch (RuntimeException e) {
				results.add(new ResultadoOperacao(fabricanteId,
						"Erro ao aprovar o registro do fabricante com ID " + fabricanteId + ": " + e.getMessage(),
						"erro"));
			}
		}
		return results;
	}

	public List<ResultadoOperacao> rejeitarRegistoFabricante(List<Long> fabricanteIds) throws IOException {
		List<ResultadoOperacao> results = new ArrayList<>();
		for (Long fabricanteId : fabricanteIds) {
			try {
				Fabricante fabricante = fabricanteRepository.findById(fabricanteId)
						.orElseThrow(() -> new RuntimeException("Fabricante não encontrado"));
				if (fabricante.getStatus().equals("PENDENTE")) {
					fabricante.setStatus("REJEITADO");
					fabricanteRepository.save(fabricante);
					emailService.sendFabricanteEmailRejeitado(fabricante.getEmail(), fabricante.getNome());

					results.add(new ResultadoOperacao(fabricanteId,
							"Registo do fabricante com ID " + fabricanteId + " rejeitado com sucesso!", "sucesso"));

				} else {
					results.add(new ResultadoOperacao(fabricanteId,
							"Registo do fabricante com ID " + fabricanteId + " não está pendente.", "erro"));

				}
				fabricante.setStatus("REJEITADO");
				fabricanteRepository.save(fabricante);

			} catch (RuntimeException e) {
				results.add(new ResultadoOperacao(fabricanteId,
						"Erro ao aprovar o rejeitar do fabricante com ID " + fabricanteId + ": " + e.getMessage(),
						"erro"));
			}
		}
		return results;
	}
	
	public void adicionarPropostasDeAdicao(List<ModeloProposta> modelosProposta, Long idFabricante) {
		
		for (ModeloProposta modeloProposta : modelosProposta) {

			
			ModeloProposta modeloPropostaSalvo = modeloPropostaRepository.save(modeloProposta);

			
			Fabricante fabricante = fabricanteRepository.findById(idFabricante).orElse(null);
			if (fabricante != null) {
				PropostaAdicao propostaAdicao = new PropostaAdicao(fabricante, fabricante.getNome());

				// guardar a proposta de adição no base de dados
				propostaAdicao = propostaAdicaoRepository.save(propostaAdicao);

				
				DetalhesVeiculos detalhesVeiculos = new DetalhesVeiculos(propostaAdicao,modeloPropostaSalvo);
				detalhesVeiculosRepository.save(detalhesVeiculos);

				System.out.println("Proposta de adição salva com sucesso: " + propostaAdicao.getId());
			} else {
				System.out.println("Fabricante não encontrado com o ID fornecido: " + idFabricante);
			}
		}
	}


}
