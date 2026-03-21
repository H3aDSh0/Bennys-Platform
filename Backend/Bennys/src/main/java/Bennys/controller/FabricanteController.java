package Bennys.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import Bennys.entity.administrador.Administrador;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteDTO;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.modeloProposta.ModeloProposta;
import Bennys.entity.modeloProposta.ModeloPropostaDTO;
import Bennys.entity.modeloProposta.ModeloPropostaRepository;
import Bennys.entity.propostaAdicao.PropostaAdicao;
import Bennys.entity.propostaAdicao.PropostaAdicaoRepository;
import Bennys.entity.propostaAdicao.PropostaDTO;
import Bennys.service.AutenticacaoService;
import Bennys.service.EmailService;
import Bennys.service.FabricanteService;
import Bennys.service.PropostaService;
import Bennys.util.Util;

@CrossOrigin("*")
@RestController
@RequestMapping("fabricante")
public class FabricanteController {

	
	@Autowired
	private FabricanteRepository fabricanteRepository;

	@Autowired
	private FabricanteService fabricanteService;

	@Autowired
	private PropostaAdicaoRepository propostaAdicaoRepository;
	
	@Autowired
	private ModeloPropostaRepository modeloPropostaRepository;
	
	@Autowired
	private AutenticacaoService autenticacaoService;
	
	@Autowired
    private PropostaService propostaService;
	
	@Autowired
	private EmailService emailService;

	@PostMapping("/adicionar-propostas")
	public ResponseEntity<String> adicionarPropostasDeAdicao(@RequestBody List<ModeloProposta> modelosProposta) throws IOException {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
		
		System.out.println("\nAdicionar Proposta \nDados recebidos:");
		for (ModeloProposta modeloProposta : modelosProposta) {
			System.out.println("Modelo: " + modeloProposta.getModelo());
			System.out.println("Ano: " + modeloProposta.getAno());
			// Adicione outras propriedades conforme necessário
			System.out.println("---------------------------------");
		}
		Long idFabricante = autenticacaoService.obterIdFabricanteAutenticado(authentication);
		fabricanteService.adicionarPropostasDeAdicao(modelosProposta, idFabricante);
		emailService.sendFabricantePropostaAdicionadaEmail(fabricante.getEmail(), fabricante.getNome(), modelosProposta.get(0).getModelo());
		return ResponseEntity.ok().body("Proposta adicionada com sucesso para o modelo " + modelosProposta.get(0).getModelo() + " do ano " + modelosProposta.get(0).getAno() + ".");
	}

	@GetMapping(value = "/visualizar-propostas", produces = "application/json")
	public ResponseEntity<List<PropostaDTO>> visualizarTodasPropostas() {
		System.out.println("\nVisualizar Propostas");

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		Long idFabricante = autenticacaoService.obterIdFabricanteAutenticado(authentication);
		List<PropostaDTO> propostasDTO = propostaService.getPropostasDoFabricanteDTO(idFabricante);

		if (propostasDTO.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.ok().body(propostasDTO);

	}
	
	
	

	

}
